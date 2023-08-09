#[rustfmt::skip]
#[path = "sf.substreams.v1.rs"]
mod pbsubstreams;

#[rustfmt::skip]
#[path = "swift.inscription.r#type.v1.rs"]
mod pbinscription;

pub use pbinscription::*;
pub use pbsubstreams::*;
