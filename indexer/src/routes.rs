use crate::handlers::transactions_handler;
use axum::{routing::get, Router};

pub fn routes() -> Router {
    Router::new().route("/transactions", get(transactions_handler))
}
