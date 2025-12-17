//! 用户应用服务

use std::sync::Arc;
use std::time::Duration;

use axum_common::{AppError, AppResult, PagedResponse};
use axum_domain::{
    cache::CacheService,
    user::{entity::User, repo::UserRepository},
};
use tracing::{info, instrument};
use ulid::Ulid;

use crate::dtos::user_dto::{CreateUserDto, UpdateUserDto, UserResponse};

/// 用户服务 - 编排领域对象和基础设施
pub struct UserService<R, C>
where
    R: UserRepository,
    C: CacheService,
{
    user_repo: Arc<R>,
    cache: Arc<C>,
}

impl<R, C> UserService<R, C>
where
    R: UserRepository,
    C: CacheService,
{
    const USER_CACHE_TTL: Duration = Duration::from_secs(3600);
    const CACHE_PREFIX: &'static str = "user";

    pub fn new(user_repo: Arc<R>, cache: Arc<C>) -> Self {
        Self { user_repo, cache }
    }

    /// 创建用户
    #[instrument(skip(self), fields(username = %dto.username))]
    pub async fn create_user(&self, dto: CreateUserDto) -> AppResult<UserResponse> {
        // 检查邮箱是否已存在
        if self.user_repo.find_by_email(&dto.email).await?.is_some() {
            return Err(AppError::Conflict("邮箱已被注册".into()));
        }

        // 检查用户名是否已存在
        if self.user_repo.find_by_username(&dto.username).await?.is_some() {
            return Err(AppError::Conflict("用户名已被使用".into()));
        }

        // 创建领域对象
        let user = User::new(dto.username, dto.email)?;

        // 持久化
        self.user_repo.save(&user).await?;

        info!(user_id = %user.id, "用户创建成功");
        Ok(UserResponse::from(user))
    }

    /// 根据 ID 查询用户（带缓存）
    #[instrument(skip(self))]
    pub async fn get_user_by_id(&self, id: Ulid) -> AppResult<UserResponse> {
        let cache_key = format!("{}:{}", Self::CACHE_PREFIX, id);

        // 尝试从缓存获取
        if let Some(cached) = self.cache.get::<UserResponse>(&cache_key).await? {
            tracing::debug!(cache_key, "Cache hit");
            return Ok(cached);
        }

        // 缓存未命中，查询数据库
        tracing::debug!(cache_key, "Cache miss");
        let user = self
            .user_repo
            .find_by_id(id)
            .await?
            .ok_or_else(|| AppError::NotFound("用户不存在".into()))?;

        let response = UserResponse::from(user);

        // 写入缓存
        self.cache
            .set(&cache_key, &response, Some(Self::USER_CACHE_TTL))
            .await?;

        Ok(response)
    }

    /// 更新用户
    #[instrument(skip(self, dto))]
    pub async fn update_user(&self, id: Ulid, dto: UpdateUserDto) -> AppResult<UserResponse> {
        let mut user = self
            .user_repo
            .find_by_id(id)
            .await?
            .ok_or_else(|| AppError::NotFound("用户不存在".into()))?;

        // 更新字段
        if let Some(username) = dto.username {
            user.update_username(username)?;
        }
        if let Some(email) = dto.email {
            // 检查新邮箱是否已被使用
            if let Some(existing) = self.user_repo.find_by_email(&email).await? {
                if existing.id != id {
                    return Err(AppError::Conflict("邮箱已被其他用户使用".into()));
                }
            }
            user.update_email(email)?;
        }

        // 持久化
        self.user_repo.update(&user).await?;

        // 清除缓存
        let cache_key = format!("{}:{}", Self::CACHE_PREFIX, id);
        self.cache.delete(&cache_key).await?;

        info!(user_id = %id, "用户更新成功");
        Ok(UserResponse::from(user))
    }

    /// 删除用户
    #[instrument(skip(self))]
    pub async fn delete_user(&self, id: Ulid) -> AppResult<()> {
        // 检查用户是否存在
        if self.user_repo.find_by_id(id).await?.is_none() {
            return Err(AppError::NotFound("用户不存在".into()));
        }

        self.user_repo.delete(id).await?;

        // 清除缓存
        let cache_key = format!("{}:{}", Self::CACHE_PREFIX, id);
        self.cache.delete(&cache_key).await?;

        info!(user_id = %id, "用户删除成功");
        Ok(())
    }

    /// 分页查询用户列表
    #[instrument(skip(self))]
    pub async fn list_users(&self, page: i64, page_size: i64) -> AppResult<PagedResponse<UserResponse>> {
        let (users, total) = self.user_repo.find_all(page, page_size).await?;
        let items = users.into_iter().map(UserResponse::from).collect();
        Ok(PagedResponse::new(items, total, page, page_size))
    }
}
