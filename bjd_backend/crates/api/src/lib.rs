//! # BJD API
//!
//! HTTP API 层，处理请求和响应。

pub mod handlers;
pub mod middleware;
pub mod request;
pub mod router;

pub use router::{create_router, AppState};
