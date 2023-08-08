use crate::handlers::{
    batch_get_dao_handler, batch_get_pledgers_by_token_info_id,
    batch_get_proposal_id_of_dao_handler, batch_get_proposals_handler,
    batch_get_token_id_of_dao_handler, batch_get_token_info_handler, create_profile_handler,
    create_token_info_handler, get_all_dao_ids_handler, get_all_proposal_ids_handler,
    get_balances_handler, get_creating_dao_proposal_ids_handler, get_funds_total_handler,
    get_pledgers_total_handler, get_profile_handler, get_stake_funds_total_handler,
    get_stakes_handler, records_handler, update_profile_handler, upsert_profile_handler,
};
use axum::{routing::get, Router};

pub fn routes() -> Router {
    Router::new()
        .route("/records", get(records_handler))
}
