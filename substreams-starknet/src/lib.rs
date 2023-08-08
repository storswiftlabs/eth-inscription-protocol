mod pb;

use pb::{
    inscription::{InscriptionProtocol, Transaction, Transactions},
    starknet::{transaction::Transaction::InvokeTransaction, BlockData},
};
use serde::{Deserialize, Serialize};

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

#[substreams::handlers::map]
fn map_transactions(blk: BlockData) -> Result<Transactions, substreams::errors::Error> {
    let transactions = blk
        .transactions
        .iter()
        .filter_map(|tx| {
            let tx = match tx.transaction.as_ref()? {
                InvokeTransaction(tx) => Some(tx),
                _ => None,
            }?;

            if tx.calldata.len() == 0 {
                return None;
            }

            let mut data = None;
            for hex_str in &tx.calldata {
                let json_bytes = hex::decode(hex_str).unwrap_or_default();

                match serde_json::from_slice::<InscriptionProtocolV1>(&json_bytes) {
                    Ok(v1) => {
                        data = Some(InscriptionProtocol {
                            r#type: v1.r#type,
                            title: v1.title,
                            text: v1.text,
                            image: v1.image,
                            receiver: v1.receiver,
                            at: v1.at,
                            with: v1.with,
                        });
                        break;
                    },
                    _ => {},
                };
            }

            if data.is_none() {
                return None
            }

            Some(Transaction {
                chain: "starknet".to_string(),
                block_number: blk.block_number,
                transaction_hash: tx.transaction_hash.to_string(),
                timestamp: blk.timestamp,
                from: tx.sender_address.to_string(),
                input_data: data,
            })
        })
        .collect();

    Ok(Transactions {
        transactions: transactions,
    })
}
