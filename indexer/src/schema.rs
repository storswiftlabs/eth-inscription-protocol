// @generated automatically by Diesel CLI.

diesel::table! {
    transition (transaction_hash) {
        transaction_hash -> Text,
        chain -> Text,
        from_address -> Text,
        input_data -> Text,
        block_number -> Int8,
        timestamp -> Int8,
    }
}
