extern crate diesel;

use crate::models::InscriptionProtocolV1;
use crate::routes::routes;
use anyhow::Error;
use clap::Parser;
use cli::{Cli, Commands};
use db::{batch_insert_swifts, POOL};
use ethers::prelude::*;
use http::Method;
use std::{
    env,
    net::SocketAddr,
    ops::Add,
    str::FromStr,
    time::{Duration, SystemTime, UNIX_EPOCH},
};
use tower_http::cors::{Any, CorsLayer};

mod cli;
mod db;
mod handlers;
mod models;
mod routes;
mod schema;

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::Sync {
            endpoint_url,
            start_block,
            end_block,
        }) => {
            sync(endpoint_url, start_block, end_block).await;
        }

        Some(Commands::Serve { port, host }) => {
            serve(host, port).await;
        }

        Some(Commands::All {
            endpoint_url,
            start_block,
            end_block,
            port,
            host,
        }) => {
            tokio::join!(
                sync(endpoint_url, start_block, end_block),
                serve(host, port),
            );
        }

        None => {}
    }
}

async fn sync(endpoint_url: &String, start_block: &u64, end_block: &u64) -> Result<(), Error> {
    let mut conn = POOL.get()?;
    let provider =
        Provider::<Http>::try_from(endpoint_url).expect("🚨 could not instantiate HTTP Provider");

    let mut current_block = *start_block;
    println!("🎏 starting synchronization from {} height", current_block);

    while current_block <= *end_block {
        println!(
            "- currently synchronizing block at height {}",
            current_block
        );
        let block = provider.get_block_with_txs(current_block).await;
        let block = match block {
            Ok(blk) => match blk {
                Some(blk) => blk,
                _ => continue,
            },
            Err(err) => {
                println!(
                    "🚨 failed to get block at {}, error: {}",
                    current_block, err
                );
                continue;
            }
        };

        let trxs: Vec<models::Swift> = block
            .transactions
            .iter()
            .filter_map(|trx| {
                let v1: InscriptionProtocolV1 =
                    InscriptionProtocolV1::from_bytes(&trx.input.to_vec())?;
                let v1 = match serde_json::to_string(&v1) {
                    Ok(value) => Some(value),
                    _ => None,
                }?;
                Some(models::Swift {
                    chain: "zksync".to_string(),
                    timestamp: SystemTime::from(
                        UNIX_EPOCH.add(Duration::new(block.number?.as_u64(), 0)),
                    ),
                    height: block.number?.as_u32().into(),
                    trx_hash: bytes_to_hex_str(&trx.hash.0.to_vec()),
                    sender: bytes_to_hex_str(&trx.from.0.to_vec()),
                    _to: bytes_to_hex_str(&trx.to?.0.to_vec()),
                    data: v1,
                })
            })
            .collect();

        if trxs.len() != 0 {
            if let Err(err) = batch_insert_swifts(&mut conn, trxs) {
                println!("🚨 batch insertion of database failed: error: {}", err);
            };
        }

        current_block += 1;
    }

    Ok(())
}

async fn serve(host: &String, port: &u16) -> Result<(), Error> {
    let app = routes().layer(
        CorsLayer::new()
            .allow_methods([Method::GET])
            .allow_origin(Any)
            .allow_headers(Any),
    );
    let addr = SocketAddr::from_str(&format!("{}:{}", host, port))?;
    println!("🚀 listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}

pub fn bytes_to_hex_str(data: &Vec<u8>) -> String {
    format!("0x{}", hex::encode(data))
}
