//! User 仓储接口定义

use super::entity::User;
use axum_common::AppResult;
use std::future::Future;
use ulid::Ulid;

/// 用户仓储接口 - 定义在 Domain 层，实现在 Infrastructure 层
/// 使用 async_trait 模式实现 dyn compatibility
pub trait UserRepository: Send + Sync {
    /// 根据 ID 查找用户
    fn find_by_id(&self, id: Ulid) -> impl Future<Output = AppResult<Option<User>>> + Send;

    /// 根据邮箱查找用户
    fn find_by_email(&self, email: &str) -> impl Future<Output = AppResult<Option<User>>> + Send;

    /// 根据用户名查找用户
    fn find_by_username(&self, username: &str) -> impl Future<Output = AppResult<Option<User>>> + Send;

    /// 保存新用户
    fn save(&self, user: &User) -> impl Future<Output = AppResult<()>> + Send;

    /// 更新用户
    fn update(&self, user: &User) -> impl Future<Output = AppResult<()>> + Send;

    /// 删除用户
    fn delete(&self, id: Ulid) -> impl Future<Output = AppResult<()>> + Send;

    /// 分页查询用户列表
    fn find_all(&self, page: i64, page_size: i64) -> impl Future<Output = AppResult<(Vec<User>, i64)>> + Send;
}
