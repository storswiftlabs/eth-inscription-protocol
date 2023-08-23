use crate::{
    models::{NewSwift, Swift},
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
use std::env;

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
    swifts: Vec<Swift>,
) -> Result<(), Error> {
    use schema::swift;

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
