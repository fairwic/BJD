//! 认证中间件
//!
//! TODO: 实现 JWT 或其他认证机制

use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::Response,
};

/// 认证中间件（示例）
pub async fn auth_middleware(request: Request, next: Next) -> Result<Response, StatusCode> {
    // TODO: 实现认证逻辑
    // 1. 从 Header 中提取 Authorization
    // 2. 验证 Token
    // 3. 将用户信息注入 Extension

    let _auth_header = request
        .headers()
        .get("Authorization")
        .and_then(|v| v.to_str().ok());

    // 暂时直接放行
    Ok(next.run(request).await)
}
