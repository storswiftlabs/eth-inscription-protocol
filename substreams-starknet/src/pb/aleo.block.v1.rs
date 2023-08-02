#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Block {
    #[prost(string, tag = "1")]
    pub block_hash: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub previous_hash: ::prost::alloc::string::String,
    #[prost(message, optional, tag = "3")]
    pub header: ::core::option::Option<Header>,
    #[prost(message, repeated, tag = "4")]
    pub transactions: ::prost::alloc::vec::Vec<Transactions>,
    #[prost(string, tag = "5")]
    pub signature: ::prost::alloc::string::String,
    #[prost(message, optional, tag = "6")]
    pub coinbase: ::core::option::Option<Coinbase>,
    #[prost(message, repeated, tag = "7")]
    pub ratifications: ::prost::alloc::vec::Vec<Ratification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Ratification {
    #[prost(string, tag = "1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub address: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub amount: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Coinbase {
    #[prost(message, repeated, tag = "1")]
    pub partial_solutions: ::prost::alloc::vec::Vec<PartialSolution>,
    #[prost(message, optional, tag = "2")]
    pub proof_w: ::core::option::Option<ProofW>,
    #[prost(string, tag = "3")]
    pub proof_random_v: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct PartialSolution {
    #[prost(string, tag = "1")]
    pub address: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub nonce: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub commitment: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ProofW {
    #[prost(string, tag = "1")]
    pub x: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub y: ::prost::alloc::string::String,
    #[prost(bool, tag = "3")]
    pub infinity: bool,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Header {
    #[prost(string, tag = "1")]
    pub previous_state_root: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub transactions_root: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub finalize_root: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub coinbase_accumulator_point: ::prost::alloc::string::String,
    #[prost(message, optional, tag = "5")]
    pub metadata: ::core::option::Option<Metadata>,
    #[prost(string, tag = "6")]
    pub ratifications_root: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Metadata {
    #[prost(uint32, tag = "1")]
    pub network: u32,
    #[prost(uint64, tag = "2")]
    pub round: u64,
    #[prost(uint32, tag = "3")]
    pub height: u32,
    #[prost(uint64, tag = "4")]
    pub total_supply_in_microcredits: u64,
    #[prost(string, tag = "5")]
    pub cumulative_weight: ::prost::alloc::string::String,
    #[prost(uint64, tag = "6")]
    pub coinbase_target: u64,
    #[prost(uint64, tag = "7")]
    pub proof_target: u64,
    #[prost(uint64, tag = "8")]
    pub last_coinbase_target: u64,
    #[prost(int64, tag = "9")]
    pub last_coinbase_timestamp: i64,
    #[prost(int64, tag = "10")]
    pub timestamp: i64,
    #[prost(string, tag = "11")]
    pub cumulative_proof_target: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Transactions {
    #[prost(string, tag = "1")]
    pub status: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(uint64, tag = "3")]
    pub index: u64,
    #[prost(message, optional, tag = "4")]
    pub transaction: ::core::option::Option<Transaction>,
    #[prost(message, repeated, tag = "5")]
    pub finalize: ::prost::alloc::vec::Vec<Finalize>,
    #[prost(message, optional, tag = "6")]
    pub rejected: ::core::option::Option<Rejected>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Rejected {
    #[prost(string, tag = "1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(message, optional, tag = "2")]
    pub program_owner: ::core::option::Option<ProgramOwner>,
    #[prost(message, optional, tag = "3")]
    pub deployment: ::core::option::Option<Deployment>,
    #[prost(message, optional, tag = "4")]
    pub execution: ::core::option::Option<Execution>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ProgramOwner {
    #[prost(string, tag = "1")]
    pub address: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub signature: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Transaction {
    #[prost(string, tag = "1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub id: ::prost::alloc::string::String,
    #[prost(message, optional, tag = "3")]
    pub execution: ::core::option::Option<Execution>,
    #[prost(message, optional, tag = "4")]
    pub fee: ::core::option::Option<Fee>,
    #[prost(message, optional, tag = "5")]
    pub owner: ::core::option::Option<Owner>,
    #[prost(message, optional, tag = "6")]
    pub deployment: ::core::option::Option<Deployment>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Deployment {
    #[prost(uint64, tag = "1")]
    pub edition: u64,
    #[prost(string, tag = "2")]
    pub program: ::prost::alloc::string::String,
    #[prost(message, repeated, tag = "3")]
    pub verifying_keys: ::prost::alloc::vec::Vec<VerifyingKey>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct VerifyingKey {
    #[prost(message, repeated, tag = "1")]
    pub values: ::prost::alloc::vec::Vec<Function>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Function {
    #[prost(string, tag = "1")]
    pub name: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "2")]
    pub keys: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Owner {
    #[prost(string, tag = "1")]
    pub address: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub signature: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Fee {
    #[prost(message, optional, tag = "1")]
    pub transition: ::core::option::Option<Transition>,
    #[prost(string, tag = "2")]
    pub global_state_root: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub inclusion: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Execution {
    #[prost(message, repeated, tag = "1")]
    pub transition: ::prost::alloc::vec::Vec<Transition>,
    #[prost(string, tag = "2")]
    pub global_state_root: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub proof: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Transition {
    #[prost(string, tag = "1")]
    pub id: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub program: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub function: ::prost::alloc::string::String,
    #[prost(message, repeated, tag = "4")]
    pub inputs: ::prost::alloc::vec::Vec<Input>,
    #[prost(message, repeated, tag = "5")]
    pub outputs: ::prost::alloc::vec::Vec<Output>,
    #[prost(string, tag = "6")]
    pub proof: ::prost::alloc::string::String,
    #[prost(string, tag = "7")]
    pub tpk: ::prost::alloc::string::String,
    #[prost(string, tag = "8")]
    pub tcm: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "9")]
    pub finalize: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Input {
    #[prost(string, tag = "1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub id: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub value: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub tag: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Output {
    #[prost(string, tag = "1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub id: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub checksum: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub value: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Finalize {
    #[prost(string, tag = "1")]
    pub r#type: ::prost::alloc::string::String,
    #[prost(string, tag = "2")]
    pub mapping_id: ::prost::alloc::string::String,
    #[prost(uint64, tag = "3")]
    pub index: u64,
    #[prost(string, tag = "4")]
    pub key_id: ::prost::alloc::string::String,
    #[prost(string, tag = "5")]
    pub value_id: ::prost::alloc::string::String,
}
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Records {
    #[prost(message, repeated, tag="1")]
    pub records: ::prost::alloc::vec::Vec<Record>,
}
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Record {
    #[prost(string, tag="1")]
    pub program: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub function: ::prost::alloc::string::String,
    #[prost(message, repeated, tag="3")]
    pub inputs: ::prost::alloc::vec::Vec<Input>,
    #[prost(message, repeated, tag="4")]
    pub outputs: ::prost::alloc::vec::Vec<Output>,
    #[prost(string, repeated, tag="5")]
    pub finalize: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag="6")]
    pub block_hash: ::prost::alloc::string::String,
    #[prost(string, tag="7")]
    pub previous_hash: ::prost::alloc::string::String,
    #[prost(string, tag="8")]
    pub transaction_id: ::prost::alloc::string::String,
    #[prost(string, tag="9")]
    pub transition_id: ::prost::alloc::string::String,
    #[prost(uint32, tag="10")]
    pub network: u32,
    #[prost(uint32, tag="11")]
    pub height: u32,
    #[prost(int64, tag="12")]
    pub timestamp: i64,
}