//! BJD Backend Server
//!
//! 程序入口，负责依赖注入和服务器启动。

use std::sync::Arc;
use std::time::Duration;

use anyhow::Context;
use sqlx::postgres::PgPoolOptions;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

use axum_api::{create_router, AppState};
use axum_application::UserService;
use axum_infrastructure::{AppConfig, PgUserRepository, RedisCacheService};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 1. 初始化日志
    init_tracing();

    tracing::info!("🚀 Starting BJD Backend Server...");

    // 2. 加载配置
    let config = AppConfig::load().context("Failed to load configuration")?;
    tracing::info!(host = %config.server.host, port = %config.server.port, "Configuration loaded");

    // 3. 初始化数据库连接池
    let pool = PgPoolOptions::new()
        .max_connections(config.database.max_connections)
        .min_connections(config.database.min_connections)
        .acquire_timeout(Duration::from_secs(config.database.acquire_timeout_secs))
        .idle_timeout(Duration::from_secs(config.database.idle_timeout_secs))
        .max_lifetime(Duration::from_secs(config.database.max_lifetime_secs))
        .connect(config.database.url())
        .await
        .context("Failed to connect to database")?;

    tracing::info!("✅ Database connection established");

    // 4. 初始化 Redis
    let redis = RedisCacheService::new(config.redis.url())
        .await
        .context("Failed to connect to Redis")?;

    tracing::info!("✅ Redis connection established");

    // 5. 初始化仓储实现
    let user_repo = Arc::new(PgUserRepository::new(pool.clone()));
    let cache = Arc::new(redis);

    // 6. 初始化应用服务 (依赖注入)
    let user_service = Arc::new(UserService::new(user_repo, cache));

    // 7. 构建应用状态
    let state = AppState { user_service };

    // 8. 构建路由
    let app = create_router(state);

    // 9. 启动服务器
    let addr = format!("{}:{}", config.server.host, config.server.port);
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .context("Failed to bind to address")?;

    tracing::info!("🌐 Server running on http://{}", addr);
    tracing::info!("📚 API docs: http://{}/api/v1", addr);
    tracing::info!("❤️  Health check: http://{}/health", addr);

    axum::serve(listener, app)
        .await
        .context("Server error")?;

    Ok(())
}

/// 初始化日志
fn init_tracing() {
    tracing_subscriber::registry()
        .with(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                // 默认日志级别：info 级别用于所有模块，debug 级别用于特定模块
                "info,axum_server=debug,axum_api=debug,axum_application=debug,axum_infrastructure=debug,tower_http=debug,sqlx=warn"
                    .into()
            }),
        )
        .with(tracing_subscriber::fmt::layer().with_target(true))
        .init();
}
