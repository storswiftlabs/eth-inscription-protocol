use crate::handlers::swifts_handler;
use axum::{routing::get, Router};

pub fn routes() -> Router {
    Router::new().route("/transactions", get(swifts_handler))
}
