// @generated
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Transactions {
    #[prost(message, repeated, tag="1")]
    pub transactions: ::prost::alloc::vec::Vec<Transaction>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Transaction {
    #[prost(string, tag="1")]
    pub chain: ::prost::alloc::string::String,
    #[prost(uint64, tag="2")]
    pub block_number: u64,
    #[prost(string, tag="3")]
    pub transaction_hash: ::prost::alloc::string::String,
    #[prost(uint64, tag="4")]
    pub timestamp: u64,
    #[prost(string, tag="5")]
    pub from: ::prost::alloc::string::String,
    #[prost(message, optional, tag="6")]
    pub input_data: ::core::option::Option<InscriptionProtocol>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct InscriptionProtocol {
    #[prost(string, tag="1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub title: ::prost::alloc::string::String,
    #[prost(string, tag="3")]
    pub text: ::prost::alloc::string::String,
    #[prost(string, repeated, tag="4")]
    pub image: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, repeated, tag="5")]
    pub receiver: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, repeated, tag="6")]
    pub at: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag="7")]
    pub with: ::prost::alloc::string::String,
}
// @@protoc_insertion_point(module)
