// @generated automatically by Diesel CLI.

diesel::table! {
    swift (trx_hash) {
        trx_hash -> Text,
        chain -> Text,
        sender -> Text,
        _to -> Text,
        height -> Int8,
        timestamp -> Timestamp,
        data -> Text,
    }
}
