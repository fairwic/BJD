//! 用户数据库模型

use axum_domain::user::entity::{User, UserStatus};
use chrono::{DateTime, Utc};
use ulid::Ulid;

/// 用户数据库模型 - 与数据库表结构对应
#[derive(Debug, sqlx::FromRow)]
pub struct UserModel {
    pub id: String,
    pub username: String,
    pub email: String,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl UserModel {
    /// 转换为领域实体
    pub fn into_entity(self) -> User {
        let status = match self.status.as_str() {
            "active" => UserStatus::Active,
            "inactive" => UserStatus::Inactive,
            "banned" => UserStatus::Banned,
            _ => UserStatus::Active, // 默认值
        };

        User {
            id: self.id.parse::<Ulid>().expect("Invalid ULID in database"),
            username: self.username,
            email: self.email,
            status,
            created_at: self.created_at,
            updated_at: self.updated_at,
        }
    }
}
