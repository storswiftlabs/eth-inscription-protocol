#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct BlockData {
    #[prost(string, tag = "1")]
    pub block_hash: ::prost::alloc::string::String,
    #[prost(uint64, tag = "2")]
    pub block_number: u64,
    #[prost(string, optional, tag = "3")]
    pub gas_price: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, tag = "4")]
    pub parent_block_hash: ::prost::alloc::string::String,
    #[prost(string, optional, tag = "5")]
    pub sequencer_address: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, tag = "6")]
    pub state_commitment: ::prost::alloc::string::String,
    #[prost(string, tag = "7")]
    pub status: ::prost::alloc::string::String,
    #[prost(uint64, tag = "8")]
    pub timestamp: u64,
    #[prost(message, repeated, tag = "9")]
    pub transaction_receipts: ::prost::alloc::vec::Vec<block_data::TransactionReceipt>,
    #[prost(message, repeated, tag = "10")]
    pub transactions: ::prost::alloc::vec::Vec<Transaction>,
    #[prost(string, tag = "11")]
    pub starknet_version: ::prost::alloc::string::String,
}
/// Nested message and enum types in `BlockData`.
pub mod block_data {
    #[allow(clippy::derive_partial_eq_without_eq)]
    #[derive(Clone, PartialEq, ::prost::Message)]
    pub struct TransactionReceipt {
        #[prost(string, optional, tag = "1")]
        pub actual_fee: ::core::option::Option<::prost::alloc::string::String>,
        #[prost(message, repeated, tag = "2")]
        pub events: ::prost::alloc::vec::Vec<transaction_receipt::Event>,
        #[prost(message, optional, tag = "3")]
        pub execution_resources: ::core::option::Option<
            transaction_receipt::ExecutionResources,
        >,
        #[prost(message, optional, tag = "4")]
        pub l1_to_l2_consumed_message: ::core::option::Option<
            transaction_receipt::L1ToL2Message,
        >,
        #[prost(message, repeated, tag = "5")]
        pub l2_to_l1_messages: ::prost::alloc::vec::Vec<
            transaction_receipt::L2ToL1Message,
        >,
        #[prost(string, tag = "6")]
        pub transaction_hash: ::prost::alloc::string::String,
        #[prost(uint64, tag = "7")]
        pub transaction_index: u64,
        #[prost(string, tag = "8")]
        pub execution_status: ::prost::alloc::string::String,
        #[prost(string, optional, tag = "9")]
        pub revert_error: ::core::option::Option<::prost::alloc::string::String>,
    }
    /// Nested message and enum types in `TransactionReceipt`.
    pub mod transaction_receipt {
        #[allow(clippy::derive_partial_eq_without_eq)]
        #[derive(Clone, PartialEq, ::prost::Message)]
        pub struct Event {
            #[prost(string, repeated, tag = "1")]
            pub data: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
            #[prost(string, tag = "2")]
            pub from_address: ::prost::alloc::string::String,
            #[prost(string, repeated, tag = "3")]
            pub keys: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
        }
        #[allow(clippy::derive_partial_eq_without_eq)]
        #[derive(Clone, PartialEq, ::prost::Message)]
        pub struct ExecutionResources {
            #[prost(message, optional, tag = "1")]
            pub builtin_instance_counter: ::core::option::Option<
                execution_resources::BuiltinInstanceCounter,
            >,
            #[prost(uint64, tag = "2")]
            pub n_steps: u64,
            #[prost(uint64, tag = "3")]
            pub n_memory_holes: u64,
        }
        /// Nested message and enum types in `ExecutionResources`.
        pub mod execution_resources {
            #[allow(clippy::derive_partial_eq_without_eq)]
            #[derive(Clone, PartialEq, ::prost::Message)]
            pub struct BuiltinInstanceCounter {
                #[prost(uint64, tag = "1")]
                pub output_builtin: u64,
                #[prost(uint64, tag = "2")]
                pub pedersen_builtin: u64,
                #[prost(uint64, tag = "3")]
                pub range_check_builtin: u64,
                #[prost(uint64, tag = "4")]
                pub ecdsa_builtin: u64,
                #[prost(uint64, tag = "5")]
                pub bitwise_builtin: u64,
                #[prost(uint64, tag = "6")]
                pub ec_op_builtin: u64,
                #[prost(uint64, tag = "7")]
                pub keccak_builtin: u64,
                #[prost(uint64, tag = "8")]
                pub poseidon_builtin: u64,
                #[prost(uint64, tag = "9")]
                pub segment_arena_builtin: u64,
            }
        }
        #[allow(clippy::derive_partial_eq_without_eq)]
        #[derive(Clone, PartialEq, ::prost::Message)]
        pub struct L1ToL2Message {
            #[prost(string, tag = "1")]
            pub from_address: ::prost::alloc::string::String,
            #[prost(string, repeated, tag = "2")]
            pub payload: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
            #[prost(string, tag = "3")]
            pub selector: ::prost::alloc::string::String,
            #[prost(string, tag = "4")]
            pub to_address: ::prost::alloc::string::String,
            #[prost(string, optional, tag = "5")]
            pub nonce: ::core::option::Option<::prost::alloc::string::String>,
        }
        #[allow(clippy::derive_partial_eq_without_eq)]
        #[derive(Clone, PartialEq, ::prost::Message)]
        pub struct L2ToL1Message {
            #[prost(string, tag = "1")]
            pub from_address: ::prost::alloc::string::String,
            #[prost(string, repeated, tag = "2")]
            pub payload: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
            #[prost(string, tag = "3")]
            pub to_address: ::prost::alloc::string::String,
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Transaction {
    #[prost(oneof = "transaction::Transaction", tags = "1, 2, 3, 4, 5")]
    pub transaction: ::core::option::Option<transaction::Transaction>,
}
/// Nested message and enum types in `Transaction`.
pub mod transaction {
    #[allow(clippy::derive_partial_eq_without_eq)]
    #[derive(Clone, PartialEq, ::prost::Oneof)]
    pub enum Transaction {
        #[prost(message, tag = "1")]
        InvokeTransaction(super::InvokeTransaction),
        #[prost(message, tag = "2")]
        DeclareTransaction(super::DeclareTransaction),
        #[prost(message, tag = "3")]
        DeployTransaction(super::DeployTransaction),
        #[prost(message, tag = "4")]
        DeployAccountTransaction(super::DeployAccountTransaction),
        #[prost(message, tag = "5")]
        L1HandlerTransaction(super::L1HandlerTransaction),
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DeclareTransaction {
    #[prost(enumeration = "TransactionType", tag = "1")]
    pub r#type: i32,
    #[prost(string, tag = "2")]
    pub version: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub class_hash: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub max_fee: ::prost::alloc::string::String,
    #[prost(string, tag = "5")]
    pub nonce: ::prost::alloc::string::String,
    #[prost(string, tag = "6")]
    pub sender_address: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "7")]
    pub signature: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag = "8")]
    pub transaction_hash: ::prost::alloc::string::String,
    #[prost(string, optional, tag = "9")]
    pub compiled_class_hash: ::core::option::Option<::prost::alloc::string::String>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DeployTransaction {
    #[prost(enumeration = "TransactionType", tag = "1")]
    pub r#type: i32,
    #[prost(string, tag = "2")]
    pub version: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub contract_address: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub contract_address_salt: ::prost::alloc::string::String,
    #[prost(string, tag = "5")]
    pub class_hash: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "6")]
    pub constructor_calldata: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag = "7")]
    pub transaction_hash: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DeployAccountTransaction {
    #[prost(enumeration = "TransactionType", tag = "1")]
    pub r#type: i32,
    #[prost(string, tag = "2")]
    pub version: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub contract_address: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub contract_address_salt: ::prost::alloc::string::String,
    #[prost(string, tag = "5")]
    pub class_hash: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "6")]
    pub constructor_calldata: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag = "7")]
    pub transaction_hash: ::prost::alloc::string::String,
    #[prost(string, tag = "8")]
    pub max_fee: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "9")]
    pub signature: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag = "10")]
    pub nonce: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct InvokeTransaction {
    #[prost(enumeration = "TransactionType", tag = "1")]
    pub r#type: i32,
    #[prost(string, tag = "2")]
    pub version: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "3")]
    pub calldata: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag = "4")]
    pub sender_address: ::prost::alloc::string::String,
    #[prost(string, optional, tag = "5")]
    pub entry_point_selector: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, optional, tag = "6")]
    pub entry_point_type: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, tag = "7")]
    pub max_fee: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "8")]
    pub signature: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, optional, tag = "9")]
    pub nonce: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, tag = "10")]
    pub transaction_hash: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct L1HandlerTransaction {
    #[prost(enumeration = "TransactionType", tag = "1")]
    pub r#type: i32,
    #[prost(string, tag = "2")]
    pub version: ::prost::alloc::string::String,
    #[prost(string, tag = "3")]
    pub contract_address: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub entry_point_selector: ::prost::alloc::string::String,
    #[prost(string, tag = "5")]
    pub nonce: ::prost::alloc::string::String,
    #[prost(string, repeated, tag = "6")]
    pub calldata: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(string, tag = "7")]
    pub transaction_hash: ::prost::alloc::string::String,
}
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
#[repr(i32)]
pub enum TransactionType {
    Declare = 0,
    Deploy = 1,
    DeployAccount = 2,
    InvokeFunction = 3,
    L1Handler = 4,
}
impl TransactionType {
    /// String value of the enum field names used in the ProtoBuf definition.
    ///
    /// The values are not transformed in any way and thus are considered stable
    /// (if the ProtoBuf definition does not change) and safe for programmatic use.
    pub fn as_str_name(&self) -> &'static str {
        match self {
            TransactionType::Declare => "DECLARE",
            TransactionType::Deploy => "DEPLOY",
            TransactionType::DeployAccount => "DEPLOY_ACCOUNT",
            TransactionType::InvokeFunction => "INVOKE_FUNCTION",
            TransactionType::L1Handler => "L1_HANDLER",
        }
    }
    /// Creates an enum from field names used in the ProtoBuf definition.
    pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
        match value {
            "DECLARE" => Some(Self::Declare),
            "DEPLOY" => Some(Self::Deploy),
            "DEPLOY_ACCOUNT" => Some(Self::DeployAccount),
            "INVOKE_FUNCTION" => Some(Self::InvokeFunction),
            "L1_HANDLER" => Some(Self::L1Handler),
            _ => None,
        }
    }
}
