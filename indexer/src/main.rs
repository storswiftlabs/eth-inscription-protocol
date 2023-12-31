extern crate diesel;

use crate::routes::routes;
use anyhow::{format_err, Context, Error};
use clap::Parser;
use cli::{Cli, Commands};
use database::{batch_insert_transactions, POOL};
use futures03::StreamExt;
use http::Method;
use prost::Message;
use proto::{module_output::Data as ModuleOutputData, BlockScopedData, Transactions};
use std::{env, net::SocketAddr, str::FromStr, sync::Arc};
use substreams::SubstreamsEndpoint;
use substreams_stream::{BlockResponse, SubstreamsStream};
use tower_http::cors::{Any, CorsLayer};

mod cli;
mod database;
mod handlers;
mod models;
mod proto;
mod routes;
mod schema;
mod substreams;
mod substreams_stream;

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::Sync {
            endpoint_url,
            package_file,
            module_name,
            start_block,
            end_block,
        }) => {
            sync(
                endpoint_url,
                package_file,
                module_name,
                start_block,
                end_block,
            )
            .await;
        }

        Some(Commands::Serve { port, host }) => {
            serve(host, port).await;
        }

        Some(Commands::All {
            endpoint_url,
            package_file,
            module_name,
            start_block,
            end_block,
            port,
            host,
        }) => {
            tokio::join!(
                sync(
                    endpoint_url,
                    package_file,
                    module_name,
                    start_block,
                    end_block,
                ),
                serve(host, port),
            );
        }

        None => {}
    }
}

async fn sync(
    endpoint_url: &String,
    package_file: &String,
    module_name: &String,
    start_block: &i64,
    end_block: &u64,
) {
    let token_env = env::var("SUBSTREAMS_API_TOKEN").unwrap_or("".to_string());
    let mut token: Option<String> = None;
    if token_env.len() > 0 {
        token = Some(token_env);
    }

    let package = read_package(&package_file).unwrap();
    let endpoint = Arc::new(SubstreamsEndpoint::new(&endpoint_url, token).await.unwrap());

    // FIXME: Handling of the cursor is missing here. It should be loaded from
    // the database and the SubstreamStream will correctly resume from the right
    // block.
    let cursor: Option<String> = None;

    let mut stream = SubstreamsStream::new(
        endpoint.clone(),
        cursor,
        package.modules.clone(),
        module_name.to_string(),
        *start_block,
        *end_block,
    );

    let mut conn = POOL.get().unwrap();

    loop {
        match stream.next().await {
            None => {
                println!("Stream consumed");
                break;
            }
            Some(event) => match event {
                Err(_) => {}
                Ok(BlockResponse::New(data)) => {
                    println!("Consuming module output (cursor {})", data.cursor);

                    match extract_records(data, &module_name).unwrap() {
                        Some(txs) => {
                            batch_insert_transactions(&mut conn, txs)
                                .context("insertion in db failed")
                                .unwrap();
                        }
                        None => {}
                    }

                    // FIXME: Handling of the cursor is missing here. It should be saved each time
                    // a full block has been correctly inserted in the database. By saving it
                    // in the database, we ensure that if we crash, on startup we are going to
                    // read it back from database and start back our SubstreamsStream with it
                    // ensuring we are continuously streaming without ever losing a single
                    // element.
                }
            },
        }
    }
}

async fn serve(host: &String, port: &u16) {
    let app = routes().layer(
        CorsLayer::new()
            .allow_methods([Method::GET])
            .allow_origin(Any)
            .allow_headers(Any),
    );
    let addr = SocketAddr::from_str(&format!("{}:{}", host, port)).unwrap();
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

fn extract_records(
    data: BlockScopedData,
    module_name: &String,
) -> Result<Option<Transactions>, Error> {
    let output = data
        .outputs
        .first()
        .ok_or(format_err!("expecting one module output"))?;
    if &output.name != module_name {
        return Err(format_err!(
            "invalid module output name {}, expecting {}",
            output.name,
            module_name
        ));
    }
    match output.data.as_ref().unwrap() {
        ModuleOutputData::MapOutput(data) => {
            let txs: Transactions = Message::decode(data.value.as_slice())?;
            Ok(Some(txs))
        }
        ModuleOutputData::StoreDeltas(_) => Err(format_err!(
            "invalid module output StoreDeltas, expecting MapOutput"
        )),
    }
}

fn read_package(file: &str) -> Result<proto::Package, anyhow::Error> {
    let content = std::fs::read(file).context(format_err!("read package {}", file))?;
    proto::Package::decode(content.as_ref()).context("decode command")
}
