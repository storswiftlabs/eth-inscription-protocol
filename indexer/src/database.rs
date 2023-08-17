use std::{
    env,
    ops::Add,
    time::{Duration, SystemTime, UNIX_EPOCH},
};

use crate::{
    models::{InscriptionProtocolV1, NewSwift, Swift},
    pb::Swifts as PbSwifts,
    schema,
};
use anyhow::{Error, Ok};
use diesel::{
    query_dsl::methods::FilterDsl,
    r2d2::{ConnectionManager, PoolError},
    BoolExpressionMethods, ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl,
    SelectableHelper,
};
use lazy_static::lazy_static;
use r2d2::{Pool, PooledConnection};

pub type PgPool = Pool<ConnectionManager<PgConnection>>;

lazy_static! {
    pub static ref POOL: PgPool = create_pg_pool().unwrap();
}

fn create_pg_pool() -> Result<PgPool, PoolError> {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(db_url);
    PgPool::builder().build(manager)
}

pub fn batch_insert_swifts(
    conn: &mut PooledConnection<ConnectionManager<PgConnection>>,
    pb_swifts: PbSwifts,
) -> Result<(), Error> {
    use schema::swift;
    let swifts: Vec<Swift> = pb_swifts
        .swifts
        .iter()
        .map(|tx| {
            let ts = tx.timestamp.as_ref().unwrap();
            Swift {
                chain: "goerli".to_string(),
                timestamp: SystemTime::from(
                    UNIX_EPOCH.add(Duration::new(ts.seconds as u64, ts.nanos as u32)),
                ),
                height: tx.height as i64,
                trx_hash: tx.trx_hash.to_string(),
                sender: tx.sender.to_string(),
                _to: tx.to.to_string(),
                data: serde_json::to_string(&InscriptionProtocolV1 {
                    r#type: tx.r#type.to_string(),
                    title: tx.title.clone(),
                    text: tx.text.clone(),
                    image: match tx.image.len() {
                        0 => None,
                        _ => Some(tx.image.clone()),
                    },
                    receiver: match tx.receiver.len() {
                        0 => None,
                        _ => Some(tx.receiver.clone()),
                    },
                    at: match tx.at.len() {
                        0 => None,
                        _ => Some(tx.at.clone()),
                    },
                    with: tx.with.clone(),
                })
                .unwrap_or_default(),
            }
        })
        .collect();

    let txs: Vec<NewSwift> = swifts
        .iter()
        .map(|tx| NewSwift {
            chain: &tx.chain,
            timestamp: tx.timestamp,
            height: tx.height,
            trx_hash: &tx.trx_hash,
            sender: &tx.sender,
            _to: &tx._to,
            data: &tx.data,
        })
        .collect();

    diesel::insert_into(swift::table)
        .values(txs)
        .execute(conn)?;

    Ok(())
}

pub fn get_swifts_by_height_range(
    conn: &mut PooledConnection<ConnectionManager<PgConnection>>,
    start_height: i64,
    end_height: i64,
) -> Result<Vec<Swift>, Error> {
    use schema::swift::dsl;

    let grouped = dsl::height.ge(start_height).and(dsl::height.le(end_height));

    let txs = FilterDsl::filter(dsl::swift, grouped)
        .select(Swift::as_select())
        .load(conn)
        .expect("Error loading records");

    Ok(txs)
}
