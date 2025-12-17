//! 用户相关 DTO

use axum_domain::user::entity::{User, UserStatus};
use serde::{Deserialize, Serialize};

/// 创建用户请求 DTO
#[derive(Debug, Deserialize)]
pub struct CreateUserDto {
    pub username: String,
    pub email: String,
}

/// 更新用户请求 DTO
#[derive(Debug, Deserialize)]
pub struct UpdateUserDto {
    pub username: Option<String>,
    pub email: Option<String>,
}

/// 用户响应 DTO
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UserResponse {
    pub id: String,
    pub username: String,
    pub email: String,
    pub status: String,
    pub created_at: String,
    pub updated_at: String,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id.to_string(),
            username: user.username,
            email: user.email,
            status: match user.status {
                UserStatus::Active => "active".to_string(),
                UserStatus::Inactive => "inactive".to_string(),
                UserStatus::Banned => "banned".to_string(),
            },
            created_at: user.created_at.to_rfc3339(),
            updated_at: user.updated_at.to_rfc3339(),
        }
    }
}

/// 用户列表查询参数
#[derive(Debug, Deserialize)]
pub struct ListUsersQuery {
    #[serde(default = "default_page")]
    pub page: i64,
    #[serde(default = "default_page_size")]
    pub page_size: i64,
}

fn default_page() -> i64 {
    1
}

fn default_page_size() -> i64 {
    20
}

impl ListUsersQuery {
    /// 验证并限制分页参数
    pub fn validated(self) -> Self {
        Self {
            page: self.page.max(1),
            page_size: self.page_size.clamp(1, 100),
        }
    }
}
