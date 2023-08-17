extern crate diesel;

use crate::routes::routes;
use anyhow::{format_err, Context, Error};
use clap::Parser;
use cli::{Cli, Commands};
use database::{batch_insert_swifts, POOL};
use http::Method;
use pb::{
    sf::substreams::{rpc::v2::BlockScopedData, v1::Package},
    Swift, Swifts,
};
use prost::Message;
use std::{net::SocketAddr, process::Command, str::FromStr};
use tower_http::cors::{Any, CorsLayer};

mod cli;
mod database;
mod handlers;
mod models;
mod pb;
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
    let mut conn = POOL.get().unwrap();

    let command = std::env::var("COMMAND").unwrap();
    let mut start_height = std::env::var("START_HEIGHT")
        .unwrap()
        .parse::<u64>()
        .unwrap();

    loop {
        println!("Current height {}", start_height);
        let append = &format!(" {command} {start_height}");
        let out = Command::new("bash").arg("-c").arg(append).output().unwrap();

        let swifts: Vec<Swift> = String::from_utf8_lossy(&out.stdout)
            .lines()
            .filter_map(|mut line| {
                line = line.trim().trim_matches('"');
                if !line.starts_with("swift-base64-encode ") {
                    return None;
                }
                line = line.trim_start_matches("swift-base64-encode ");
                let bytes = base64::decode(line).unwrap();
                let swift: Swift = Message::decode(bytes.as_slice()).unwrap();
                println!("Capturing Inscription Data: {:?}", swift);
                Some(swift)
            })
            .collect();

        batch_insert_swifts(&mut conn, Swifts { swifts: swifts });
        start_height += 1;
    }

    // let token_env = env::var("SUBSTREAMS_API_TOKEN").unwrap_or("".to_string());
    // let mut token: Option<String> = None;
    // if token_env.len() > 0 {
    //     token = Some(token_env);
    // }

    // let package = read_package(&package_file).await.unwrap();
    // let endpoint = Arc::new(SubstreamsEndpoint::new(&endpoint_url, token).await.unwrap());

    // // FIXME: Handling of the cursor is missing here. It should be loaded from
    // // the database and the SubstreamStream will correctly resume from the right
    // // block.
    // let cursor: Option<String> = None;

    // let mut stream = SubstreamsStream::new(
    //     endpoint.clone(),
    //     cursor,
    //     package.modules.clone(),
    //     module_name.to_string(),
    //     *start_block,
    //     *end_block,
    // );

    // let mut conn = POOL.get().unwrap();

    // loop {
    //     match stream.next().await {
    //         None => {
    //             println!("Stream consumed");
    //             break;
    //         }
    //         Some(Ok(BlockResponse::New(data))) => {
    //             println!("Consuming module output (cursor {})", data.cursor);
    //             match extract_swifts(data, &module_name).unwrap() {
    //                 Some(swifts) => {
    //                     batch_insert_swifts(&mut conn, swifts)
    //                         .context("insertion in db failed")
    //                         .unwrap();
    //                 }
    //                 None => {}
    //             }
    //         }
    //         Some(Ok(BlockResponse::Undo(undo_signal))) => {
    //             println!("BlockUndoSignal");
    //         }
    //         Some(Err(err)) => {
    //             println!();
    //             println!("Stream terminated with error");
    //             println!("{:?}", err);
    //             exit(1);
    //         }
    //     }
    // }
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

fn extract_swifts(data: BlockScopedData, module_name: &String) -> Result<Option<Swifts>, Error> {
    let output = data
        .output
        .ok_or(format_err!("expecting one module output"))?;
    if &output.name != module_name {
        return Err(format_err!(
            "invalid module output name {}, expecting {}",
            output.name,
            module_name
        ));
    }
    let swifts: Swifts = Message::decode(output.map_output.as_ref().unwrap().value.as_slice())?;
    Ok(Some(swifts))
}

async fn read_package(input: &str) -> Result<Package, anyhow::Error> {
    if input.starts_with("http") {
        return read_http_package(input).await;
    }

    // Assume it's a local file

    let content =
        std::fs::read(input).context(format_err!("read package from file '{}'", input))?;
    Package::decode(content.as_ref()).context("decode command")
}

async fn read_http_package(input: &str) -> Result<Package, anyhow::Error> {
    let body = reqwest::get(input).await?.bytes().await?;

    Package::decode(body).context("decode command")
}
