//! User 实体定义

use axum_common::DomainError;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ulid::Ulid;

/// 用户实体 - 聚合根
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Ulid,
    pub username: String,
    pub email: String,
    pub status: UserStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// 用户状态
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum UserStatus {
    Active,
    Inactive,
    Banned,
}

impl Default for UserStatus {
    fn default() -> Self {
        Self::Active
    }
}

impl User {
    /// 创建新用户 - 包含业务规则验证
    pub fn new(username: String, email: String) -> Result<Self, DomainError> {
        // 业务规则验证
        if username.len() < 3 {
            return Err(DomainError::Validation("用户名长度不能少于3个字符".into()));
        }
        if username.len() > 50 {
            return Err(DomainError::Validation("用户名长度不能超过50个字符".into()));
        }
        if !email.contains('@') {
            return Err(DomainError::Validation("邮箱格式不正确".into()));
        }

        let now = Utc::now();
        Ok(Self {
            id: Ulid::new(),
            username,
            email,
            status: UserStatus::default(),
            created_at: now,
            updated_at: now,
        })
    }

    /// 更新邮箱
    pub fn update_email(&mut self, new_email: String) -> Result<(), DomainError> {
        if !new_email.contains('@') {
            return Err(DomainError::Validation("邮箱格式不正确".into()));
        }
        self.email = new_email;
        self.updated_at = Utc::now();
        Ok(())
    }

    /// 更新用户名
    pub fn update_username(&mut self, new_username: String) -> Result<(), DomainError> {
        if new_username.len() < 3 {
            return Err(DomainError::Validation("用户名长度不能少于3个字符".into()));
        }
        self.username = new_username;
        self.updated_at = Utc::now();
        Ok(())
    }

    /// 禁用用户
    pub fn ban(&mut self) {
        self.status = UserStatus::Banned;
        self.updated_at = Utc::now();
    }

    /// 激活用户
    pub fn activate(&mut self) {
        self.status = UserStatus::Active;
        self.updated_at = Utc::now();
    }

    /// 检查用户是否处于活跃状态
    pub fn is_active(&self) -> bool {
        self.status == UserStatus::Active
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_user_success() {
        let user = User::new("testuser".into(), "test@example.com".into());
        assert!(user.is_ok());
        let user = user.unwrap();
        assert_eq!(user.username, "testuser");
        assert!(user.is_active());
    }

    #[test]
    fn test_create_user_short_username() {
        let user = User::new("ab".into(), "test@example.com".into());
        assert!(user.is_err());
    }

    #[test]
    fn test_create_user_invalid_email() {
        let user = User::new("testuser".into(), "invalid-email".into());
        assert!(user.is_err());
    }

    #[test]
    fn test_ban_user() {
        let mut user = User::new("testuser".into(), "test@example.com".into()).unwrap();
        user.ban();
        assert!(!user.is_active());
        assert_eq!(user.status, UserStatus::Banned);
    }
}
