//! 缓存服务接口定义

use axum_common::AppResult;
use std::future::Future;
use std::time::Duration;

/// 缓存服务接口 - 定义在 Domain 层，实现在 Infrastructure 层
pub trait CacheService: Send + Sync {
    /// 获取缓存值
    fn get<T: serde::de::DeserializeOwned>(&self, key: &str) -> impl Future<Output = AppResult<Option<T>>> + Send;

    /// 设置缓存值
    fn set<T: serde::Serialize + Sync>(
        &self,
        key: &str,
        value: &T,
        ttl: Option<Duration>,
    ) -> impl Future<Output = AppResult<()>> + Send;

    /// 删除缓存
    fn delete(&self, key: &str) -> impl Future<Output = AppResult<()>> + Send;

    /// 检查键是否存在
    fn exists(&self, key: &str) -> impl Future<Output = AppResult<bool>> + Send;
}
