use std::env;

use crate::{
    models::{InscriptionProtocolV1, NewTransaction, Transaction},
    proto::Transactions,
    schema,
};
use anyhow::{Error, Ok};
use diesel::{
    r2d2::{ConnectionManager, PoolError},
    ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl, SelectableHelper,
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

pub fn batch_insert_transactions(
    conn: &mut PooledConnection<ConnectionManager<PgConnection>>,
    transactions: Transactions,
) -> Result<(), Error> {
    use schema::transition;

    let txs: Vec<Transaction> = transactions
        .transactions
        .iter()
        .filter_map(|tx| {
            let inscription = tx.input_data.clone()?;
            let input_data_str = &serde_json::to_string(&InscriptionProtocolV1 {
                r#type: inscription.r#type,
                title: inscription.title,
                text: inscription.text,
                image: inscription.image,
                receiver: inscription.receiver,
                at: inscription.at,
                with: inscription.with,
            })
            .unwrap_or_default();

            Some(Transaction {
                chain: tx.chain.to_string(),
                block_number: tx.block_number as i64,
                transaction_hash: tx.transaction_hash.to_string(),
                timestamp: tx.timestamp as i64,
                from_address: tx.from.to_string(),
                input_data: input_data_str.to_string(),
            })
        })
        .collect();

    let txs: Vec<NewTransaction> = txs
        .iter()
        .map(|tx| NewTransaction {
            chain: &tx.chain,
            block_number: tx.block_number as i64,
            transaction_hash: &tx.transaction_hash,
            timestamp: tx.timestamp as i64,
            from_address: &tx.from_address,
            input_data: &tx.input_data,
        })
        .collect();

    diesel::insert_into(transition::table)
        .values(txs)
        .execute(conn)?;

    Ok(())
}

pub fn get_transactions_by_address(
    conn: &mut PooledConnection<ConnectionManager<PgConnection>>,
    from_address: &String,
) -> Result<Vec<Transaction>, Error> {
    use schema::transition::dsl;

    let txs = dsl::transition
        .filter(dsl::from_address.eq(from_address))
        .select(Transaction::as_select())
        .load(conn)
        .expect("Error loading records");

    Ok(txs)
}
