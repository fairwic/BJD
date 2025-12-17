//! 路由配置

use axum::{
    routing::{delete, get, post, put},
    Router,
};
use std::sync::Arc;
use tower_http::{
    compression::CompressionLayer,
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};

use crate::handlers::user_handler;
use crate::handlers::health_handler;
use axum_application::UserService;
use axum_domain::{cache::CacheService, user::repo::UserRepository};

/// 应用状态 - 使用泛型
#[derive(Clone)]
pub struct AppState<R, C>
where
    R: UserRepository + 'static,
    C: CacheService + 'static,
{
    pub user_service: Arc<UserService<R, C>>,
}

/// 创建路由
pub fn create_router<R, C>(state: AppState<R, C>) -> Router
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    Router::new()
        // 健康检查
        .route("/health", get(health_handler::health_check))
        // API 路由
        .nest("/api/v1", api_routes::<R, C>())
        // 中间件
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .with_state(state)
}

/// API v1 路由
fn api_routes<R, C>() -> Router<AppState<R, C>>
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    Router::new()
        // 用户路由
        .route("/users", post(user_handler::create_user::<R, C>))
        .route("/users", get(user_handler::list_users::<R, C>))
        .route("/users/{id}", get(user_handler::get_user::<R, C>))
        .route("/users/{id}", put(user_handler::update_user::<R, C>))
        .route("/users/{id}", delete(user_handler::delete_user::<R, C>))
}
