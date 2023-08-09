use crate::{
    database::{get_transactions_by_address, POOL},
    models::TransactionResp,
};
use axum::{extract::Query, Json};
use std::collections::HashMap;

pub async fn transactions_handler(
    Query(params): Query<HashMap<String, String>>,
) -> Json<Vec<TransactionResp>> {
    let mut conn = POOL.get().unwrap();
    let from_address = params.get("address").unwrap();

    let txs = get_transactions_by_address(&mut conn, from_address).unwrap();

    let results = txs
        .iter()
        .map(|tx| TransactionResp {
            chain: tx.chain.to_string(),
            block_number: tx.block_number,
            transaction_hash: tx.transaction_hash.to_string(),
            timestamp: tx.timestamp,
            from_address: tx.from_address.to_string(),
            input_data: serde_json::from_str(&tx.input_data).unwrap(),
        })
        .collect::<Vec<TransactionResp>>();

    Json(results)
}
