mod pb;

use std::{str::from_utf8, process::Command};
use pb::{sf::ethereum::r#type::v2::Block, swift::r#type::v1::Swifts};
use prost::Message;
use serde::{Deserialize, Serialize};
use substreams::log;
use crate::pb::swift::r#type::v1::Swift;

#[derive(Serialize, Deserialize, Debug)]
pub struct InscriptionProtocolV1 {
    pub r#type: String,
    pub title: Option<String>,
    pub text: Option<String>,
    pub with: Option<String>,
    pub at: Option<Vec<String>>,
    pub image: Option<Vec<String>>,
    pub receiver: Option<Vec<String>>,
}

impl InscriptionProtocolV1 {
    pub fn from_bytes(data: &Vec<u8>) -> Option<Self> {
        // The minimum input for the Inscription Protocol is "data:,{}"
        if data.len() < 8 || data[..6] != [100, 97, 116, 97, 58, 44]  {
            return None;
        }

        match serde_json::from_slice::<InscriptionProtocolV1>(&data[6..]) {
            Ok(v1) => Some(v1),
            _ => None,
        }
    }
}

pub fn bytes_to_hex_str(data: &Vec<u8>) -> String {
    format!("0x{}", hex::encode(data))
}

#[substreams::handlers::map]
fn map_eth_swifts(blk: Block) -> Result<Swifts, substreams::errors::Error> {
    let swifts = blk
        .transaction_traces
        .iter()
        .filter_map(|trx| {
            let v1 = InscriptionProtocolV1::from_bytes(&trx.input)?;
            let swift = Swift {
                timestamp: blk.header.clone()?.timestamp,
                height: blk.number,
                trx_hash: bytes_to_hex_str(&trx.hash),
                chain: "ethereum".to_string(),
                sender: bytes_to_hex_str(&trx.from),
                to: bytes_to_hex_str(&trx.to),
                r#type: v1.r#type,
                title: v1.title,
                text: v1.text,
                with: v1.with,
                image: v1.image.unwrap_or_default(),
                receiver: v1.receiver.unwrap_or_default(),
                at: v1.at.unwrap_or_default(),
            };
            let mut buf = vec![];
            swift.encode(&mut buf).unwrap_or_else(|_| {
                log::info!(
                    "Could not convert protobuf header to bytes '{:?}'",
                    swift.trx_hash
                )
            });
            Some(format!("swift-base64-encode {}", base64::encode(buf)))
        })
        .collect();

    Ok(Swifts { swifts })
}
