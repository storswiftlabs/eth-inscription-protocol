// @generated
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Swifts {
    #[prost(string, repeated, tag="1")]
    pub swifts: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Swift {
    #[prost(message, optional, tag="1")]
    pub timestamp: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(uint64, tag="2")]
    pub height: u64,
    #[prost(string, tag="3")]
    pub trx_hash: ::prost::alloc::string::String,
    #[prost(string, tag="4")]
    pub chain: ::prost::alloc::string::String,
    #[prost(string, tag="5")]
    pub sender: ::prost::alloc::string::String,
    #[prost(string, tag="6")]
    pub to: ::prost::alloc::string::String,
    #[prost(string, tag="7")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, optional, tag="8")]
    pub title: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, optional, tag="9")]
    pub text: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, optional, tag="10")]
    pub with: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, repeated, tag="11")]
    pub image: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, repeated, tag="12")]
    pub receiver: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, repeated, tag="13")]
    pub at: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
}
// @@protoc_insertion_point(module)
