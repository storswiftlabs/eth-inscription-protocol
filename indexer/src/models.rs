use super::schema::swift;
use anyhow::Error;
use diesel::{prelude::*, Queryable};
use serde::{Deserialize, Serialize};
use std::time::SystemTime;

#[derive(Serialize, Deserialize, Debug)]
pub struct TransactionResp {
    pub chain: String,
    pub block_number: i64,
    pub transaction_hash: String,
    pub timestamp: i64,
    pub from_address: String,
    pub input_data: InscriptionProtocolV1,
}

#[derive(Serialize, Deserialize, Debug, Default)]
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
        if data.len() < 8 || data[..6] != [100, 97, 116, 97, 58, 44] {
            return None;
        }

        match serde_json::from_slice::<InscriptionProtocolV1>(&data[6..]) {
            Ok(v1) => Some(v1),
            _ => None,
        }
    }

    pub fn from_hex_str(value: &str) -> Option<Self> {
        let buffer = match hex::decode(value.trim_start_matches("0x")) {
            Ok(buf) => Some(buf),
            _ => None,
        }?;

        Self::from_bytes(&buffer)
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SwiftResp {
    pub chain: String,
    pub height: i64,
    pub trx_hash: String,
    pub timestamp: u64,
    pub sender: String,
    pub to: String,
    pub r#type: String,
    pub title: Option<String>,
    pub text: Option<String>,
    pub with: Option<String>,
    pub at: Option<Vec<String>>,
    pub image: Option<Vec<String>>,
    pub receiver: Option<Vec<String>>,
}

#[derive(Queryable, Selectable, Deserialize, Serialize)]
#[diesel(table_name = swift)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Swift {
    pub chain: String,
    pub height: i64,
    pub trx_hash: String,
    pub timestamp: SystemTime,
    pub sender: String,
    pub _to: String,
    pub data: String,
}

#[derive(Insertable)]
#[diesel(table_name = swift)]
pub struct NewSwift<'a> {
    pub chain: &'a str,
    pub height: i64,
    pub trx_hash: &'a str,
    pub timestamp: SystemTime,
    pub sender: &'a str,
    pub _to: &'a str,
    pub data: &'a str,
}
