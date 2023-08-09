use super::schema::transition;
use diesel::{prelude::*, Queryable};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct TransactionResp {
    pub chain: String,
    pub block_number: i64,
    pub transaction_hash: String,
    pub timestamp: i64,
    pub from_address: String,
    pub input_data: InscriptionProtocolV1,
}

#[derive(Serialize, Deserialize, Debug)]
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
#[diesel(table_name = transition)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Transaction {
    pub chain: String,
    pub block_number: i64,
    pub transaction_hash: String,
    pub timestamp: i64,
    pub from_address: String,
    pub input_data: String,
}

#[derive(Insertable)]
#[diesel(table_name = transition)]
pub struct NewTransaction<'a> {
    pub chain: &'a str,
    pub block_number: i64,
    pub transaction_hash: &'a str,
    pub timestamp: i64,
    pub from_address: &'a str,
    pub input_data: &'a str,
}
