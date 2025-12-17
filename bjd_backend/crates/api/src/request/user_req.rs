//! 用户请求 DTO

use axum_application::dtos::user_dto::CreateUserDto;
use serde::Deserialize;
use validator::Validate;

/// 创建用户请求
#[derive(Debug, Deserialize, Validate)]
pub struct CreateUserRequest {
    #[validate(length(min = 3, max = 50, message = "用户名长度需在3-50字符之间"))]
    pub username: String,

    #[validate(email(message = "邮箱格式不正确"))]
    pub email: String,
}

impl CreateUserRequest {
    /// 转换为应用层 DTO
    pub fn into_dto(self) -> CreateUserDto {
        CreateUserDto {
            username: self.username,
            email: self.email,
        }
    }
}
