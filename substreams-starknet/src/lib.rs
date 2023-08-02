mod pb;
use pb::aleo;

#[substreams::handlers::map]
fn map_records(blk: aleo::Block) -> Result<aleo::Records, substreams::errors::Error> {
    let metadata = blk.header.unwrap().metadata.unwrap();

    let records: Vec<aleo::Record> = blk
        .transactions
        .into_iter()
        .filter_map(|transaction| {
            if transaction.status != "accepted" { return None }
            let transaction = transaction.transaction?;
            let mut transitions = transaction.execution.unwrap_or_default().transition;
            transitions.extend(transaction.fee.unwrap_or_default().transition);
            Some(
                transitions
                    .into_iter()
                    .map(|transition| aleo::Record {
                        program: transition.program,
                        function: transition.function,
                        inputs: transition.inputs,
                        outputs: transition.outputs,
                        finalize: transition.finalize,
                        block_hash: blk.block_hash.clone(),
                        previous_hash: blk.previous_hash.clone(),
                        transaction_id: transaction.id.clone(),
                        transition_id: transition.id,
                        network: metadata.network,
                        height: metadata.height,
                        timestamp: metadata.timestamp,
                    })
                    .collect::<Vec<aleo::Record>>(),
            )
        })
        .flatten()
        .collect();

    Ok(aleo::Records { records: records })
}
