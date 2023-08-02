#[rustfmt::skip]
#[path = "sf.substreams.v1.rs"]
mod pbsubstreams;

#[rustfmt::skip]
#[path = "starknet.protocol.v1.rs"]
mod pbneeds;


pub use pbmapping::*;
pub use pbneeds::*;
pub use pbsubstreams::*;
