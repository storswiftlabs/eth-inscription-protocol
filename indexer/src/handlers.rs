use crate::{
    db::{get_swifts_by_height_range, POOL},
    models::{InscriptionProtocolV1, SwiftResp},
};
use axum::{extract::Query, Json};
use std::{collections::HashMap, time::UNIX_EPOCH};

pub async fn swifts_handler(Query(params): Query<HashMap<String, String>>) -> Json<Vec<SwiftResp>> {
    let mut conn = POOL.get().unwrap();
    let start_height = params
        .get("start_height")
        .unwrap_or(&"0".to_string())
        .parse::<i64>()
        .unwrap_or_default();
    let end_height = params
        .get("end_height")
        .unwrap_or(&i64::MAX.to_string())
        .parse::<i64>()
        .unwrap_or(i64::MAX);

    let txs = get_swifts_by_height_range(&mut conn, start_height, end_height).unwrap();

    let results = txs
        .iter()
        .map(|tx| {
            let v1_data: InscriptionProtocolV1 = serde_json::from_str(&tx.data).unwrap_or_default();
            SwiftResp {
                chain: tx.chain.to_string(),
                height: tx.height,
                trx_hash: tx.trx_hash.to_string(),
                timestamp: tx.timestamp.duration_since(UNIX_EPOCH).unwrap().as_secs(),
                sender: tx.sender.to_string(),
                to: tx._to.to_string(),
                r#type: v1_data.r#type,
                title: v1_data.title,
                text: v1_data.text,
                image: v1_data.image,
                receiver: v1_data.receiver,
                at: v1_data.at,
                with: v1_data.with,
            }
        })
        .collect::<Vec<SwiftResp>>();

    Json(results)
}
