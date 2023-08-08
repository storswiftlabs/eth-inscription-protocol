use super::schema::record;
use diesel::{prelude::*, Queryable};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Selectable, Deserialize, Serialize)]
#[diesel(table_name = record)]
#[diesel(check_for_backend(diesel::pg::Pg))]
epub struct Transaction {
    pub chain: String,
    pub block_number: i64,
    pub transaction_hash: String,
    pub timestamp: i64,
    pub from: String,
    pub input_data: String,
}

#[derive(Insertable)]
#[diesel(table_name = record)]
pub struct NewTransaction<'a> {
    pub chain: &'a str,
    pub block_number: i64,
    pub transaction_hash: &'a str,
    pub timestamp: i64,
    pub from: &'a str,
    pub input_data: &'a str,
}