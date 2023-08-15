use std::time::SystemTime;

use super::schema::swift;
use diesel::{prelude::*, Queryable};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SwiftResp {
    pub chain: String,
    pub height: i64,
    pub trx_hash: String,
    pub timestamp: SystemTime,
    pub sender: String,
    pub to: String,
    pub r#type: String,
    pub title: String,
    pub text: String,
    pub image: Vec<String>,
    pub receiver: Vec<String>,
    pub at: Vec<String>,
    pub with: String,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct InscriptionProtocolV1 {
    pub r#type: String,
    pub title: String,
    pub text: String,
    pub image: Vec<String>,
    pub receiver: Vec<String>,
    pub at: Vec<String>,
    pub with: String,
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
