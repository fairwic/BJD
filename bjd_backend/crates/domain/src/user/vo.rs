//! User 值对象定义

use axum_common::DomainError;
use serde::{Deserialize, Serialize};

/// 邮箱值对象 - 不可变，带验证
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Email(String);

impl Email {
    pub fn new(value: String) -> Result<Self, DomainError> {
        if !value.contains('@') || value.len() < 5 {
            return Err(DomainError::Validation("无效的邮箱格式".into()));
        }
        Ok(Self(value))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl AsRef<str> for Email {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

/// 用户名值对象
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Username(String);

impl Username {
    pub fn new(value: String) -> Result<Self, DomainError> {
        if value.len() < 3 {
            return Err(DomainError::Validation("用户名太短".into()));
        }
        if value.len() > 50 {
            return Err(DomainError::Validation("用户名太长".into()));
        }
        Ok(Self(value))
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl AsRef<str> for Username {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_email_valid() {
        let email = Email::new("test@example.com".into());
        assert!(email.is_ok());
    }

    #[test]
    fn test_email_invalid() {
        let email = Email::new("invalid".into());
        assert!(email.is_err());
    }

    #[test]
    fn test_username_valid() {
        let username = Username::new("john".into());
        assert!(username.is_ok());
    }

    #[test]
    fn test_username_too_short() {
        let username = Username::new("ab".into());
        assert!(username.is_err());
    }
}
