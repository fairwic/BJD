//! 错误处理模块
//!
//! 提供统一的错误类型定义和 HTTP 响应转换。

use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;

/// 领域层错误 - 纯业务逻辑错误
#[derive(Error, Debug)]
pub enum DomainError {
    #[error("验证失败: {0}")]
    Validation(String),

    #[error("业务规则违反: {0}")]
    BusinessRule(String),
}

/// 应用层错误 - 统一错误处理
#[derive(Error, Debug)]
pub enum AppError {
    #[error("{0}")]
    Validation(String),

    #[error("{0}")]
    NotFound(String),

    #[error("{0}")]
    Conflict(String),

    #[error("未授权访问")]
    Unauthorized,

    #[error("禁止访问")]
    Forbidden,

    #[error("数据库错误: {0}")]
    Database(#[from] sqlx::Error),

    #[error("领域错误: {0}")]
    Domain(#[from] DomainError),

    #[error("序列化错误: {0}")]
    Serialization(#[from] serde_json::Error),

    #[error("内部错误: {0}")]
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        // 记录详细错误日志
        tracing::error!(error = %self, "请求处理失败");

        let (status, code, message) = match &self {
            Self::Validation(msg) => (StatusCode::BAD_REQUEST, "VALIDATION_ERROR", msg.as_str()),
            Self::NotFound(msg) => (StatusCode::NOT_FOUND, "NOT_FOUND", msg.as_str()),
            Self::Conflict(msg) => (StatusCode::CONFLICT, "CONFLICT", msg.as_str()),
            Self::Unauthorized => (StatusCode::UNAUTHORIZED, "UNAUTHORIZED", "未授权访问"),
            Self::Forbidden => (StatusCode::FORBIDDEN, "FORBIDDEN", "禁止访问"),
            Self::Domain(_) => (
                StatusCode::UNPROCESSABLE_ENTITY,
                "DOMAIN_ERROR",
                "业务规则错误",
            ),
            // 内部错误不暴露详情给客户端
            Self::Database(_) | Self::Internal(_) | Self::Serialization(_) => {
                (StatusCode::INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "服务器内部错误")
            }
        };

        let body = Json(json!({
            "success": false,
            "error": {
                "code": code,
                "message": message
            }
        }));

        (status, body).into_response()
    }
}

/// 应用层结果类型别名
pub type AppResult<T> = Result<T, AppError>;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_domain_error_display() {
        let err = DomainError::Validation("用户名太短".into());
        assert_eq!(err.to_string(), "验证失败: 用户名太短");
    }

    #[test]
    fn test_app_error_from_domain() {
        let domain_err = DomainError::BusinessRule("库存不足".into());
        let app_err: AppError = domain_err.into();
        assert!(matches!(app_err, AppError::Domain(_)));
    }
}
