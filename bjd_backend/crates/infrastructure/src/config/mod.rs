//! 配置管理模块

use config::{Config, ConfigError, Environment, File};
use serde::Deserialize;

/// 应用配置
#[derive(Debug, Deserialize, Clone)]
pub struct AppConfig {
    pub server: ServerConfig,
    pub database: DatabaseConfig,
    pub redis: RedisConfig,
    #[serde(default)]
    pub cache: CacheConfig,
}

/// 服务器配置
#[derive(Debug, Deserialize, Clone)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
}

/// 数据库配置
#[derive(Debug, Deserialize, Clone)]
pub struct DatabaseConfig {
    pub url: String,
    #[serde(default = "default_max_connections")]
    pub max_connections: u32,
    #[serde(default = "default_min_connections")]
    pub min_connections: u32,
    #[serde(default = "default_acquire_timeout")]
    pub acquire_timeout_secs: u64,
    #[serde(default = "default_idle_timeout")]
    pub idle_timeout_secs: u64,
    #[serde(default = "default_max_lifetime")]
    pub max_lifetime_secs: u64,
}

fn default_max_connections() -> u32 {
    20
}
fn default_min_connections() -> u32 {
    5
}
fn default_acquire_timeout() -> u64 {
    3
}
fn default_idle_timeout() -> u64 {
    600
}
fn default_max_lifetime() -> u64 {
    1800
}

impl DatabaseConfig {
    pub fn url(&self) -> &str {
        &self.url
    }
}

/// Redis 配置
#[derive(Debug, Deserialize, Clone)]
pub struct RedisConfig {
    pub url: String,
    #[serde(default = "default_redis_max_connections")]
    pub max_connections: u32,
}

fn default_redis_max_connections() -> u32 {
    10
}

impl RedisConfig {
    pub fn url(&self) -> &str {
        &self.url
    }
}

/// 缓存配置
#[derive(Debug, Deserialize, Clone)]
pub struct CacheConfig {
    #[serde(default = "default_cache_ttl")]
    pub default_ttl_secs: u64,
    #[serde(default = "default_null_cache_ttl")]
    pub null_cache_ttl_secs: u64,
}

fn default_cache_ttl() -> u64 {
    3600
}
fn default_null_cache_ttl() -> u64 {
    60
}

impl Default for CacheConfig {
    fn default() -> Self {
        Self {
            default_ttl_secs: default_cache_ttl(),
            null_cache_ttl_secs: default_null_cache_ttl(),
        }
    }
}

impl AppConfig {
    /// 加载配置
    pub fn load() -> Result<Self, ConfigError> {
        let run_mode = std::env::var("RUN_MODE").unwrap_or_else(|_| "development".into());

        let config = Config::builder()
            // 基础配置
            .add_source(File::with_name("config/default"))
            // 环境特定配置
            .add_source(File::with_name(&format!("config/{}", run_mode)).required(false))
            // 环境变量覆盖 (APP__SERVER__PORT -> server.port)
            .add_source(
                Environment::with_prefix("APP")
                    .prefix_separator("__")
                    .separator("__"),
            )
            // 支持 DATABASE_URL 等常见环境变量
            .add_source(
                Environment::default()
                    .try_parsing(true),
            )
            .build()?;

        config.try_deserialize()
    }
}
