//! Redis 缓存服务实现

use axum_common::{AppError, AppResult};
use axum_domain::cache::CacheService;
use fred::prelude::*;
use std::time::Duration;

/// Redis 缓存服务
#[derive(Clone)]
pub struct RedisCacheService {
    client: RedisClient,
}

impl RedisCacheService {
    /// 创建新的 Redis 缓存服务
    pub async fn new(url: &str) -> AppResult<Self> {
        let config = RedisConfig::from_url(url)
            .map_err(|e| AppError::Internal(format!("Redis config error: {}", e)))?;

        let client = Builder::from_config(config).build()
            .map_err(|e| AppError::Internal(format!("Redis build error: {}", e)))?;
        
        client.init().await
            .map_err(|e| AppError::Internal(format!("Redis init error: {}", e)))?;

        tracing::info!("Redis connection established");
        Ok(Self { client })
    }

    /// 获取 Redis 客户端引用
    pub fn client(&self) -> &RedisClient {
        &self.client
    }
}

impl CacheService for RedisCacheService {
    async fn get<T: serde::de::DeserializeOwned>(&self, key: &str) -> AppResult<Option<T>> {
        let value: Option<String> = self.client.get(key).await
            .map_err(|e| AppError::Internal(format!("Redis get error: {}", e)))?;
        match value {
            Some(v) => {
                let parsed = serde_json::from_str(&v)?;
                Ok(Some(parsed))
            }
            None => Ok(None),
        }
    }

    async fn set<T: serde::Serialize + Sync>(
        &self,
        key: &str,
        value: &T,
        ttl: Option<Duration>,
    ) -> AppResult<()> {
        let json = serde_json::to_string(value)?;
        match ttl {
            Some(duration) => {
                self.client
                    .set::<(), _, _>(
                        key,
                        json.as_str(),
                        Some(Expiration::EX(duration.as_secs() as i64)),
                        None,
                        false,
                    )
                    .await
                    .map_err(|e| AppError::Internal(format!("Redis set error: {}", e)))?;
            }
            None => {
                self.client.set::<(), _, _>(key, json.as_str(), None, None, false).await
                    .map_err(|e| AppError::Internal(format!("Redis set error: {}", e)))?;
            }
        }
        Ok(())
    }

    async fn delete(&self, key: &str) -> AppResult<()> {
        self.client.del::<i64, _>(key).await
            .map_err(|e| AppError::Internal(format!("Redis del error: {}", e)))?;
        Ok(())
    }

    async fn exists(&self, key: &str) -> AppResult<bool> {
        let result: i64 = self.client.exists(key).await
            .map_err(|e| AppError::Internal(format!("Redis exists error: {}", e)))?;
        Ok(result > 0)
    }
}
