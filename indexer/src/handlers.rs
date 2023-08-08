use crate::database::{get_balances_by_owner, get_pledgers_by_token_info_id, get_token_info_by_id};
use crate::program_handler::bhp256_hash_address;
use crate::{
    database::{
        get_all_dao_ids, get_all_proposal_ids, get_creating_dao_proposal_ids, get_dao_by_id,
        get_dao_proposal_ids_by_dao_id, get_funds_total, get_pledgers_total,
        get_profile_by_address, get_proposals_by_proposal_id, get_records_by_height,
        get_stake_funds_total, get_stakes_by_owner, insert_profile, insert_token_info,
        update_profile, upsert_profile, POOL,
    },
    models::{Daos, Input, Output, Profiles, Proposals, RespRecords, TokenInfos},
};
use axum::{
    extract::{Path, Query},
    response::Json,
};
use diesel::{r2d2::ConnectionManager, PgConnection};
use r2d2::PooledConnection;
use std::{collections::HashMap, str::FromStr};

pub async fn records_handler(
    Query(params): Query<HashMap<String, String>>,
) -> Json<Vec<RespRecords>> {
    let mut conn: PooledConnection<ConnectionManager<PgConnection>> = POOL.get().unwrap();
    let default_start_block = "0".to_string();
    let default_end_block = i64::MAX.to_string();
    let start_block = params.get("start_block").unwrap_or(&default_start_block);
    let start_block = i64::from_str(start_block).unwrap_or(0);
    let end_block = params.get("end_block").unwrap_or(&default_end_block);
    let end_block = i64::from_str(&end_block).unwrap_or(i64::MAX);

    let records = get_records_by_height(&mut conn, start_block, end_block).unwrap();

    let results = records
        .iter()
        .map(|record| {
            let inputs: Vec<Input> = serde_json::from_str(&record.inputs).unwrap();
            let outputs: Vec<Output> = serde_json::from_str(&record.outputs).unwrap();
            let record_values = outputs
                .iter()
                .filter_map(|output| {
                    if output.r#type.eq("record") {
                        Some(output.value.clone())
                    } else {
                        None
                    }
                })
                .collect();

            RespRecords {
                records: record_values,
                transaction_id: record.transaction_id.clone(),
                transition_id: record.transition_id.clone(),
                network: record.network,
                height: record.height,
                timestamp: record.timestamp,
                inputs: inputs,
                outputs: outputs,
            }
        })
        .collect::<Vec<RespRecords>>();

    Json(results)
}
