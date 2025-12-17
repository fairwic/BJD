# BJD 后端项目开发规范 (Rust)

## 1. 概述 (Overview)

本项目采用 Rust 语言开发，旨在构建高性能、高可靠性的后端服务。架构设计遵循 **领域驱动设计 (DDD)** 思想，严格执行 **依赖倒置原则 (DIP)**，以确保系统的可维护性、可测试性和松耦合。

## 2. 技术栈 (Tech Stack)

| 组件 | 技术选型 | 版本建议 | 说明 |
| :--- | :--- | :--- | :--- |
| **编程语言** | Rust | 1.83+ | 2024 edition |
| **Web 框架** | Axum | 0.8.x | 高性能、人体工程学友好的异步 Web 框架 |
| **数据库/ORM** | SQLx | 0.8.x | 异步、编译时检查 SQL 的数据库驱动 (Postgres Feature) |
| **搜索引擎** | Elasticsearch | 8.x | 配合 `elasticsearch` crate 使用 |
| **序列化** | Serde | 1.0 | 强类型序列化/反序列化 (JSON) |
| **配置管理** | Config | 0.14 | 支持 File, Environment, layered config |
| **日志/追踪** | Tracing | 0.1 | 结构化日志 (`tracing-subscriber` + `tracing-appender`) |
| **错误处理** | Thiserror | 2.0 | 库和领域层错误定义 |
| **错误处理** | Anyhow | 1.0 | 应用层/顶层错误处理 |
| **异步运行时** | Tokio | 1.x | 业界标准异步运行时 |
| **缓存** | Redis | 7.x | 配合 `fred` 或 `redis` crate 使用 |
| **工具库** | Chrono / Time | - | 时间处理 |
| **工具库** | Validator | - | 数据校验 |
| **ID 生成** | Ulid / Uuid | - | 分布式唯一 ID 生成 |

## 3. 架构设计 (Architecture)

采用经典的四层架构，结合 Rust 的模块化特性。

```
┌──────────────────────────────────────────────────────────────┐
│                    Interfaces (API)                         │
│            HTTP Handlers, Request DTOs, Routers             │
├──────────────────────────────────────────────────────────────┤
│                    Application                              │
│         Services, Use Cases, Response DTOs                  │
├──────────────────────────────────────────────────────────────┤
│                      Domain                                 │
│     Entities, Value Objects, Repository Traits              │
├──────────────────────────────────────────────────────────────┤
│                   Infrastructure                            │
│      Repository Impl, External Services, Config             │
└──────────────────────────────────────────────────────────────┘
```

### 3.1 分层职责详解

#### 1. 用户接口层 (Interfaces / Adapters)
*   **定位**：系统的入口，负责与外部世界交互。
*   **包含**：HTTP API (Axum Handlers), gRPC Services, CLI 命令。
*   **职责**：
    *   解析 HTTP 请求 (Query, Body, Headers)。
    *   参数校验 (使用 `validator` crate)。
    *   转换请求数据为应用层 DTO。
    *   调用应用层服务。
    *   将结果转换为 HTTP 响应 (JSON)，处理错误映射。

#### 2. 应用层 (Application)
*   **定位**：业务流程编排。
*   **包含**：Service (Use Cases), Command/Query Handlers, DTOs。
*   **职责**：
    *   协调领域对象和基础设施服务。
    *   **不包含**复杂的业务规则（应下沉至领域层）。
    *   **不依赖**具体技术实现（Db Connection, ES Client），仅依赖接口。
    *   事务控制 (Transaction Management) 通常在此层开启。

#### 3. 领域层 (Domain) - **核心 (Core)**
*   **定位**：业务逻辑的核心，系统的灵魂。
*   **包含**：
    *   **Entity (实体)**: 具有唯一标识，有生命周期的对象 (e.g., `User`, `Order`)。
    *   **Value Object (值对象)**: 无唯一标识，仅由属性描述的对象 (e.g., `Address`, `Money`)。不可变。
    *   **Aggregate (聚合)**: 一组相关对象的集合，由聚合根 (Root Entity) 统一管理。
    *   **Repository Interface (仓储接口)**: 定义数据访问的抽象接口 (Trait)。
    *   **Domain Service**: 无法归属于单一实体的跨实体业务逻辑。
*   **原则**：**纯净 (Pure)**。不依赖 `sqlx`, `axum`, `tokio` (除非通过 trait 抽象)。只依赖 `std` 和必要的纯算法库。

#### 4. 基础设施层 (Infrastructure)
*   **定位**：技术细节的实现者。
*   **包含**：
    *   **Persistence**: `Repository` 接口的 SQLx/ES 实现。
    *   **External Services**: 发送邮件、短信接口的实现。
    *   **Config**: 配置加载逻辑。
*   **职责**：实现领域层和应用层定义的接口。

### 3.2 依赖倒置 (DIP) 实践

为了解耦，**上层不依赖下层，而是依赖抽象**。

*   **错误示范**: `UserService` 直接引用 `PgUserRepository struct`。
*   **正确示范**:
    1.  `Domain` 层定义 `trait UserRepository { ... }`。
    2.  `Application` 层引用 `Arc<dyn UserRepository>`。
    3.  `Infrastructure` 层定义 `struct PgUserRepository` 并实现 `UserRepository`。
    4.  `Main` 函数中进行组装：`let repo = Arc::new(PgUserRepository::new(pool));`。

## 4. 目录结构规范 (Project Structure)

本项目采用 **Workspace 多 Crate 结构**，将不同职责的代码分离到独立的 crate 中，以实现更好的编译隔离、依赖管理和代码复用。

### 4.1 Workspace 结构概览

```text
bjd_backend/
├── Cargo.toml              # Workspace 根配置
├── .env.example            # 环境变量模板
├── config/                 # 配置文件目录
│   ├── default.toml
│   ├── development.toml
│   └── production.toml
├── docs/                   # 项目文档
├── migrations/             # SQLx 数据库迁移文件
│
├── crates/
│   ├── api/                # [Interfaces Layer] HTTP API 入口
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── router.rs
│   │       ├── middleware/
│   │       ├── handlers/
│   │       └── request/
│   │
│   ├── application/        # [Application Layer] 业务编排
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── services/
│   │       └── dtos/
│   │
│   ├── domain/             # [Domain Layer] 纯领域模型 (无外部依赖)
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── user/
│   │       │   ├── mod.rs
│   │       │   ├── entity.rs
│   │       │   ├── vo.rs
│   │       │   └── repo.rs   # Repository Trait
│   │       └── product/
│   │
│   ├── infrastructure/     # [Infrastructure Layer] 技术实现
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── postgres/
│   │       ├── redis/
│   │       ├── elasticsearch/
│   │       └── models/
│   │
│   └── common/             # 通用工具库
│       ├── Cargo.toml
│       └── src/
│           ├── lib.rs
│           ├── error.rs
│           ├── response.rs
│           └── constants.rs
│
└── bins/
    └── server/             # 可执行文件入口
        ├── Cargo.toml
        └── src/
            └── main.rs     # 程序入口 (DI 组装, Server 启动)
```

### 4.2 Workspace Cargo.toml

```toml
# Cargo.toml (Workspace Root)
[workspace]
resolver = "2"
members = [
    "crates/*",
    "bins/*",
]

[workspace.package]
version = "0.1.0"
edition = "2024"
authors = ["BJD Team"]
license = "MIT"

[workspace.dependencies]
# 在此统一管理所有依赖版本
axum = "0.8"
tokio = { version = "1", features = ["full"] }
sqlx = { version = "0.8", features = ["runtime-tokio", "postgres", "chrono", "uuid"] }
fred = { version = "9", features = ["enable-rustls"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
thiserror = "2"
anyhow = "1"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "json"] }
chrono = { version = "0.4", features = ["serde"] }
ulid = { version = "1", features = ["serde"] }
validator = { version = "0.18", features = ["derive"] }
config = "0.14"

# 内部 crate 引用
bjd-domain = { path = "crates/domain" }
bjd-application = { path = "crates/application" }
bjd-infrastructure = { path = "crates/infrastructure" }
bjd-api = { path = "crates/api" }
bjd-common = { path = "crates/common" }
```

### 4.3 各 Crate 依赖关系

```
┌─────────────────────────────────────────────────────────────────┐
│                         bins/server                             │
│                    (main.rs - DI Assembly)                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ depends on
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
    ┌─────────┐      ┌───────────┐     ┌─────────────────┐
    │   api   │ ───▶ │application│ ───▶│     domain      │
    └─────────┘      └───────────┘     │   (Pure Rust)   │
         │                 │           └─────────────────┘
         │                 │                   ▲
         │                 ▼                   │ implements
         │          ┌─────────────────┐        │
         └────────▶ │ infrastructure  │────────┘
                    │ (Postgres/Redis)│
                    └─────────────────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
              ┌─────────┐   ┌─────────┐
              │ common  │   │ common  │
              └─────────┘   └─────────┘
```

### 4.4 各 Crate 的 Cargo.toml 示例

```toml
# crates/domain/Cargo.toml
[package]
name = "bjd-domain"
version.workspace = true
edition.workspace = true

[dependencies]
thiserror.workspace = true
chrono.workspace = true
ulid.workspace = true
# 注意：domain 层不依赖 sqlx, axum, tokio 等
```

```toml
# crates/infrastructure/Cargo.toml
[package]
name = "bjd-infrastructure"
version.workspace = true
edition.workspace = true

[dependencies]
bjd-domain.workspace = true
bjd-common.workspace = true
sqlx.workspace = true
fred.workspace = true  # Redis client
tokio.workspace = true
tracing.workspace = true
```

### 4.5 多 Crate 架构的优势

| 优势 | 说明 |
| :--- | :--- |
| **编译隔离** | 修改 API 层不会重新编译 Domain 层，加快开发迭代 |
| **依赖清晰** | 强制执行分层依赖，Domain 无法意外引入 SQLx |
| **复用性** | Domain crate 可被其他项目（如 CLI 工具）复用 |
| **并行编译** | Cargo 可并行编译无依赖关系的 crate |
| **测试隔离** | 各 crate 可独立运行测试 |

## 5. 参考代码实现 (Reference Implementation)

### 5.1 领域层 (Domain)

```rust
// src/domain/user/entity.rs
use crate::common::error::DomainError;
use ulid::Ulid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone)]
pub struct User {
    pub id: Ulid,
    pub username: String,
    pub email: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl User {
    /// 创建新用户 - 领域方法包含业务规则验证
    pub fn new(username: String, email: String) -> Result<Self, DomainError> {
        // 业务规则验证
        if username.len() < 3 {
            return Err(DomainError::Validation("用户名长度不能少于3个字符".into()));
        }
        if !email.contains('@') {
            return Err(DomainError::Validation("邮箱格式不正确".into()));
        }

        let now = Utc::now();
        Ok(Self {
            id: Ulid::new(),
            username,
            email,
            created_at: now,
            updated_at: now,
        })
    }

    /// 更新邮箱 - 领域行为方法
    pub fn update_email(&mut self, new_email: String) -> Result<(), DomainError> {
        if !new_email.contains('@') {
            return Err(DomainError::Validation("邮箱格式不正确".into()));
        }
        self.email = new_email;
        self.updated_at = Utc::now();
        Ok(())
    }
}
```

```rust
// src/domain/user/repo.rs
use super::entity::User;
use crate::common::error::AppResult;
use ulid::Ulid;

/// 仓储接口 - 定义在 Domain 层，实现在 Infrastructure 层
/// 注意：使用 trait_variant::make 宏简化 async trait (Rust 1.75+)
#[trait_variant::make(UserRepository: Send)]
pub trait LocalUserRepository {
    async fn find_by_id(&self, id: Ulid) -> AppResult<Option<User>>;
    async fn find_by_email(&self, email: &str) -> AppResult<Option<User>>;
    async fn save(&self, user: &User) -> AppResult<()>;
    async fn update(&self, user: &User) -> AppResult<()>;
    async fn delete(&self, id: Ulid) -> AppResult<()>;
}
```

### 5.2 应用层 (Application)

```rust
// src/application/services/user_service.rs
use std::sync::Arc;
use crate::domain::user::{entity::User, repo::UserRepository};
use crate::application::dtos::user_dto::{CreateUserDto, UserResponse};
use crate::common::error::{AppError, AppResult};
use tracing::{info, instrument};

pub struct UserService {
    user_repo: Arc<dyn UserRepository>,
}

impl UserService {
    pub fn new(user_repo: Arc<dyn UserRepository>) -> Self {
        Self { user_repo }
    }

    /// 创建用户 - 编排领域对象和基础设施
    #[instrument(skip(self))]
    pub async fn create_user(&self, dto: CreateUserDto) -> AppResult<UserResponse> {
        // 1. 检查邮箱是否已存在
        if self.user_repo.find_by_email(&dto.email).await?.is_some() {
            return Err(AppError::Conflict("邮箱已被注册".into()));
        }

        // 2. 创建领域对象（业务规则验证在 User::new 中）
        let user = User::new(dto.username, dto.email)?;

        // 3. 持久化
        self.user_repo.save(&user).await?;

        info!(user_id = %user.id, "用户创建成功");
        Ok(UserResponse::from(user))
    }

    /// 根据 ID 查询用户
    #[instrument(skip(self))]
    pub async fn get_user_by_id(&self, id: ulid::Ulid) -> AppResult<UserResponse> {
        self.user_repo
            .find_by_id(id)
            .await?
            .map(UserResponse::from)
            .ok_or(AppError::NotFound("用户不存在".into()))
    }
}
```

```rust
// src/application/dtos/user_dto.rs
use crate::domain::user::entity::User;
use serde::{Deserialize, Serialize};

/// 创建用户请求 DTO
#[derive(Debug, Deserialize)]
pub struct CreateUserDto {
    pub username: String,
    pub email: String,
}

/// 用户响应 DTO - 用于 API 返回
#[derive(Debug, Serialize)]
pub struct UserResponse {
    pub id: String,
    pub username: String,
    pub email: String,
    pub created_at: String,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id.to_string(),
            username: user.username,
            email: user.email,
            created_at: user.created_at.to_rfc3339(),
        }
    }
}
```

### 5.3 用户接口层 (Interfaces)

```rust
// src/api/request/user_req.rs
use serde::Deserialize;
use validator::Validate;

/// HTTP 请求 DTO - 包含输入校验
#[derive(Debug, Deserialize, Validate)]
pub struct CreateUserRequest {
    #[validate(length(min = 3, max = 50, message = "用户名长度需在3-50字符之间"))]
    pub username: String,

    #[validate(email(message = "邮箱格式不正确"))]
    pub email: String,
}

impl CreateUserRequest {
    pub fn into_dto(self) -> crate::application::dtos::user_dto::CreateUserDto {
        crate::application::dtos::user_dto::CreateUserDto {
            username: self.username,
            email: self.email,
        }
    }
}
```

```rust
// src/api/handlers/user_handler.rs
use axum::{
    extract::{Path, State},
    Json,
};
use validator::Validate;
use crate::api::request::user_req::CreateUserRequest;
use crate::application::dtos::user_dto::UserResponse;
use crate::common::error::{AppError, AppResult};
use crate::common::response::ApiResponse;
use crate::AppState;

/// 创建用户 Handler
pub async fn create_user(
    State(state): State<AppState>,
    Json(req): Json<CreateUserRequest>,
) -> AppResult<Json<ApiResponse<UserResponse>>> {
    // 1. 请求参数校验
    req.validate()
        .map_err(|e| AppError::Validation(e.to_string()))?;

    // 2. 调用应用服务
    let user = state.user_service.create_user(req.into_dto()).await?;

    // 3. 返回统一响应格式
    Ok(Json(ApiResponse::success(user)))
}

/// 获取用户 Handler
pub async fn get_user(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> AppResult<Json<ApiResponse<UserResponse>>> {
    let ulid = id.parse().map_err(|_| AppError::Validation("无效的用户ID".into()))?;
    let user = state.user_service.get_user_by_id(ulid).await?;
    Ok(Json(ApiResponse::success(user)))
}
```

```rust
// src/api/router.rs
use axum::{routing::{get, post}, Router};
use crate::api::handlers::user_handler;
use crate::AppState;

pub fn create_router(state: AppState) -> Router {
    Router::new()
        .nest("/api/v1", api_routes())
        .with_state(state)
}

fn api_routes() -> Router<AppState> {
    Router::new()
        .route("/users", post(user_handler::create_user))
        .route("/users/:id", get(user_handler::get_user))
}
```

### 5.4 基础设施层 (Infrastructure)

```rust
// src/infrastructure/persistence/postgres/user_repo_impl.rs
use sqlx::PgPool;
use ulid::Ulid;
use crate::domain::user::{entity::User, repo::UserRepository};
use crate::common::error::AppResult;
use crate::infrastructure::persistence::models::user_model::UserModel;

pub struct PgUserRepository {
    pool: PgPool,
}

impl PgUserRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

impl UserRepository for PgUserRepository {
    async fn find_by_id(&self, id: Ulid) -> AppResult<Option<User>> {
        let result = sqlx::query_as!(
            UserModel,
            r#"SELECT id, username, email, created_at, updated_at FROM users WHERE id = $1"#,
            id.to_string()
        )
        .fetch_optional(&self.pool)
        .await?;

        Ok(result.map(|m| m.into_entity()))
    }

    async fn find_by_email(&self, email: &str) -> AppResult<Option<User>> {
        let result = sqlx::query_as!(
            UserModel,
            r#"SELECT id, username, email, created_at, updated_at FROM users WHERE email = $1"#,
            email
        )
        .fetch_optional(&self.pool)
        .await?;

        Ok(result.map(|m| m.into_entity()))
    }

    async fn save(&self, user: &User) -> AppResult<()> {
        sqlx::query!(
            r#"INSERT INTO users (id, username, email, created_at, updated_at) 
               VALUES ($1, $2, $3, $4, $5)"#,
            user.id.to_string(),
            user.username,
            user.email,
            user.created_at,
            user.updated_at
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn update(&self, user: &User) -> AppResult<()> {
        sqlx::query!(
            r#"UPDATE users SET username = $1, email = $2, updated_at = $3 WHERE id = $4"#,
            user.username,
            user.email,
            user.updated_at,
            user.id.to_string()
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete(&self, id: Ulid) -> AppResult<()> {
        sqlx::query!(r#"DELETE FROM users WHERE id = $1"#, id.to_string())
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
```

```rust
// src/infrastructure/persistence/models/user_model.rs
use chrono::{DateTime, Utc};
use ulid::Ulid;
use crate::domain::user::entity::User;

/// 数据库模型 - 与数据库表结构对应
#[derive(Debug, sqlx::FromRow)]
pub struct UserModel {
    pub id: String,
    pub username: String,
    pub email: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl UserModel {
    /// 转换为领域实体
    pub fn into_entity(self) -> User {
        User {
            id: self.id.parse().expect("Invalid ULID in database"),
            username: self.username,
            email: self.email,
            created_at: self.created_at,
            updated_at: self.updated_at,
        }
    }
}
```

### 5.5 依赖注入 (Main)

```rust
// src/main.rs
use std::sync::Arc;
use axum::Router;
use sqlx::postgres::PgPoolOptions;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod api;
mod application;
mod common;
mod domain;
mod infrastructure;

use crate::api::router::create_router;
use crate::application::services::user_service::UserService;
use crate::infrastructure::persistence::postgres::user_repo_impl::PgUserRepository;

/// 应用状态 - 用于 Axum State 提取
#[derive(Clone)]
pub struct AppState {
    pub user_service: Arc<UserService>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 1. 初始化日志
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    // 2. 加载配置
    let database_url = std::env::var("DATABASE_URL")?;

    // 3. 初始化数据库连接池
    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await?;

    // 4. 初始化仓储实现
    let user_repo = Arc::new(PgUserRepository::new(pool.clone()));

    // 5. 初始化应用服务 (依赖注入)
    let user_service = Arc::new(UserService::new(user_repo));

    // 6. 构建应用状态
    let state = AppState { user_service };

    // 7. 构建路由
    let app = create_router(state);

    // 8. 启动服务器
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    tracing::info!("🚀 Server running on http://0.0.0.0:3000");
    axum::serve(listener, app).await?;

    Ok(())
}
```

## 6. 错误处理规范 (Error Handling)

采用分层错误策略：`thiserror` 用于领域/库层，`anyhow` 用于应用层顶部。

```rust
// src/common/error.rs
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;

/// 领域层错误
#[derive(Error, Debug)]
pub enum DomainError {
    #[error("验证失败: {0}")]
    Validation(String),

    #[error("业务规则违反: {0}")]
    BusinessRule(String),
}

/// 应用层错误 - 统一错误处理
#[derive(Error, Debug)]
pub enum AppError {
    #[error("{0}")]
    Validation(String),

    #[error("{0}")]
    NotFound(String),

    #[error("{0}")]
    Conflict(String),

    #[error("未授权访问")]
    Unauthorized,

    #[error("禁止访问")]
    Forbidden,

    #[error("数据库错误: {0}")]
    Database(#[from] sqlx::Error),

    #[error("领域错误: {0}")]
    Domain(#[from] DomainError),

    #[error("内部错误: {0}")]
    Internal(String),
}

/// 实现 IntoResponse - Axum 错误转 HTTP 响应
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        // 先记录详细错误日志
        tracing::error!(error = %self, "请求处理失败");

        let (status, code, message) = match &self {
            AppError::Validation(msg) => (StatusCode::BAD_REQUEST, "VALIDATION_ERROR", msg.as_str()),
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, "NOT_FOUND", msg.as_str()),
            AppError::Conflict(msg) => (StatusCode::CONFLICT, "CONFLICT", msg.as_str()),
            AppError::Unauthorized => (StatusCode::UNAUTHORIZED, "UNAUTHORIZED", "未授权访问"),
            AppError::Forbidden => (StatusCode::FORBIDDEN, "FORBIDDEN", "禁止访问"),
            AppError::Domain(e) => (StatusCode::UNPROCESSABLE_ENTITY, "DOMAIN_ERROR", &e.to_string()),
            // 内部错误不暴露详情给客户端
            AppError::Database(_) | AppError::Internal(_) => {
                (StatusCode::INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "服务器内部错误")
            }
        };

        let body = Json(json!({
            "success": false,
            "error": {
                "code": code,
                "message": message
            }
        }));

        (status, body).into_response()
    }
}

pub type AppResult<T> = Result<T, AppError>;
```

## 7. 统一响应格式 (API Response)

```rust
// src/common/response.rs
use serde::Serialize;

/// 统一 API 响应格式
#[derive(Debug, Serialize)]
pub struct ApiResponse<T: Serialize> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<ErrorDetail>,
}

#[derive(Debug, Serialize)]
pub struct ErrorDetail {
    pub code: String,
    pub message: String,
}

impl<T: Serialize> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    pub fn error(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(ErrorDetail {
                code: code.into(),
                message: message.into(),
            }),
        }
    }
}

/// 分页响应
#[derive(Debug, Serialize)]
pub struct PagedResponse<T: Serialize> {
    pub items: Vec<T>,
    pub total: i64,
    pub page: i64,
    pub page_size: i64,
    pub total_pages: i64,
}
```

## 8. 配置管理 (Configuration)

```rust
// src/infrastructure/config/mod.rs
use config::{Config, ConfigError, Environment, File};
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct AppConfig {
    pub server: ServerConfig,
    pub database: DatabaseConfig,
    pub elasticsearch: Option<ElasticsearchConfig>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
}

#[derive(Debug, Deserialize, Clone)]
pub struct DatabaseConfig {
    pub url: String,
    pub max_connections: u32,
}

#[derive(Debug, Deserialize, Clone)]
pub struct ElasticsearchConfig {
    pub url: String,
}

impl AppConfig {
    pub fn load() -> Result<Self, ConfigError> {
        let run_mode = std::env::var("RUN_MODE").unwrap_or_else(|_| "development".into());

        let config = Config::builder()
            // 基础配置
            .add_source(File::with_name("config/default"))
            // 环境特定配置
            .add_source(File::with_name(&format!("config/{}", run_mode)).required(false))
            // 环境变量覆盖 (APP_SERVER__PORT -> server.port)
            .add_source(Environment::with_prefix("APP").separator("__"))
            .build()?;

        config.try_deserialize()
    }
}
```

## 9. 日志规范 (Logging / Tracing)

```rust
// 日志初始化示例
use tracing_subscriber::{
    fmt,
    layer::SubscriberExt,
    util::SubscriberInitExt,
    EnvFilter,
};

pub fn init_tracing() {
    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| {
            // 默认日志级别
            "bjd_backend=debug,tower_http=debug,sqlx=warn".into()
        }))
        .with(fmt::layer().json()) // JSON 格式输出，便于日志聚合
        .init();
}
```

### 日志使用规范

```rust
use tracing::{info, warn, error, instrument, Span};

impl UserService {
    /// #[instrument] 自动记录函数调用和参数
    #[instrument(
        name = "user_service.create_user",
        skip(self),  // 跳过 self，避免日志过大
        fields(username = %dto.username)  // 自定义字段
    )]
    pub async fn create_user(&self, dto: CreateUserDto) -> AppResult<UserResponse> {
        info!("开始创建用户");

        let user = User::new(dto.username, dto.email)?;

        // 添加动态 span 字段
        Span::current().record("user_id", user.id.to_string());

        self.user_repo.save(&user).await?;

        info!("用户创建成功");
        Ok(UserResponse::from(user))
    }
}
```

## 10. 测试规范 (Testing)

### 10.1 测试策略

| 层级 | 测试类型 | 依赖 | 目标 |
| :--- | :--- | :--- | :--- |
| Domain | 单元测试 | 无外部依赖 | 100% 覆盖业务规则 |
| Application | 单元测试 | Mock Repository | 验证编排逻辑 |
| Infrastructure | 集成测试 | 真实数据库 | 验证 SQL 正确性 |
| API | 端到端测试 | 全栈或 Mock | 验证 HTTP 接口 |

### 10.2 Mock Repository 示例

```rust
// tests/mocks/user_repo_mock.rs
use std::collections::HashMap;
use std::sync::Mutex;
use ulid::Ulid;
use crate::domain::user::{entity::User, repo::UserRepository};
use crate::common::error::AppResult;

pub struct MockUserRepository {
    users: Mutex<HashMap<Ulid, User>>,
}

impl Default for MockUserRepository {
    fn default() -> Self {
        Self { users: Mutex::new(HashMap::new()) }
    }
}

impl UserRepository for MockUserRepository {
    async fn find_by_id(&self, id: Ulid) -> AppResult<Option<User>> {
        Ok(self.users.lock().unwrap().get(&id).cloned())
    }

    async fn find_by_email(&self, email: &str) -> AppResult<Option<User>> {
        Ok(self.users.lock().unwrap()
            .values()
            .find(|u| u.email == email)
            .cloned())
    }

    async fn save(&self, user: &User) -> AppResult<()> {
        self.users.lock().unwrap().insert(user.id, user.clone());
        Ok(())
    }

    async fn update(&self, user: &User) -> AppResult<()> {
        self.users.lock().unwrap().insert(user.id, user.clone());
        Ok(())
    }

    async fn delete(&self, id: Ulid) -> AppResult<()> {
        self.users.lock().unwrap().remove(&id);
        Ok(())
    }
}
```

### 10.3 Service 单元测试

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use crate::tests::mocks::MockUserRepository;

    #[tokio::test]
    async fn test_create_user_success() {
        // Arrange
        let repo = Arc::new(MockUserRepository::default());
        let service = UserService::new(repo);

        let dto = CreateUserDto {
            username: "testuser".into(),
            email: "test@example.com".into(),
        };

        // Act
        let result = service.create_user(dto).await;

        // Assert
        assert!(result.is_ok());
        let user = result.unwrap();
        assert_eq!(user.username, "testuser");
    }

    #[tokio::test]
    async fn test_create_user_duplicate_email() {
        // Arrange
        let repo = Arc::new(MockUserRepository::default());
        let service = UserService::new(repo.clone());

        // 先创建一个用户
        let dto1 = CreateUserDto {
            username: "user1".into(),
            email: "test@example.com".into(),
        };
        service.create_user(dto1).await.unwrap();

        // 尝试用相同邮箱再创建
        let dto2 = CreateUserDto {
            username: "user2".into(),
            email: "test@example.com".into(),
        };

        // Act
        let result = service.create_user(dto2).await;

        // Assert
        assert!(matches!(result, Err(AppError::Conflict(_))));
    }
}
```

## 11. 数据库迁移 (Migration)

### 11.1 使用 sqlx-cli

```bash
# 安装
cargo install sqlx-cli --no-default-features --features postgres

# 创建迁移
sqlx migrate add create_users_table

# 运行迁移
sqlx migrate run

# 回滚迁移
sqlx migrate revert
```

### 11.2 迁移文件规范

每个迁移必须包含 **Up** 和 **Down** 脚本，且必须是幂等的。

```sql
-- migrations/20241217000000_create_users_table.up.sql
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(26) PRIMARY KEY,  -- ULID 格式
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- migrations/20241217000000_create_users_table.down.sql
DROP TABLE IF EXISTS users;
```

## 12. Elasticsearch 集成规范

```rust
// src/domain/search/repo.rs
use crate::common::error::AppResult;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SearchResult<T> {
    pub items: Vec<T>,
    pub total: u64,
}

#[trait_variant::make(SearchRepository: Send)]
pub trait LocalSearchRepository<T> {
    async fn search(&self, query: &str, from: u64, size: u64) -> AppResult<SearchResult<T>>;
    async fn index(&self, id: &str, doc: &T) -> AppResult<()>;
    async fn delete(&self, id: &str) -> AppResult<()>;
}
```

```rust
// src/infrastructure/persistence/elasticsearch/product_search_impl.rs
use elasticsearch::{Elasticsearch, SearchParts, IndexParts};
use crate::domain::product::entity::Product;
use crate::domain::search::repo::{SearchRepository, SearchResult};
use crate::common::error::AppResult;

pub struct EsProductSearch {
    client: Elasticsearch,
    index: String,
}

impl EsProductSearch {
    pub fn new(client: Elasticsearch, index: String) -> Self {
        Self { client, index }
    }
}

impl SearchRepository<Product> for EsProductSearch {
    async fn search(&self, query: &str, from: u64, size: u64) -> AppResult<SearchResult<Product>> {
        let response = self.client
            .search(SearchParts::Index(&[&self.index]))
            .from(from as i64)
            .size(size as i64)
            .body(serde_json::json!({
                "query": {
                    "multi_match": {
                        "query": query,
                        "fields": ["name^2", "description"]
                    }
                }
            }))
            .send()
            .await?;

        // 解析响应并返回
        todo!()
    }

    async fn index(&self, id: &str, doc: &Product) -> AppResult<()> {
        self.client
            .index(IndexParts::IndexId(&self.index, id))
            .body(doc)
            .send()
            .await?;
        Ok(())
    }

    async fn delete(&self, id: &str) -> AppResult<()> {
        self.client
            .delete(elasticsearch::DeleteParts::IndexId(&self.index, id))
            .send()
            .await?;
        Ok(())
    }
}
```

## 13. 安全规范 (Security)

### 13.1 敏感数据处理

```rust
// 使用 secrecy crate 保护敏感数据
use secrecy::{ExposeSecret, Secret};

pub struct DatabaseConfig {
    pub url: Secret<String>,  // 不会被意外打印
}

// 使用时显式暴露
pool.connect(config.url.expose_secret()).await?;
```

### 13.2 输入验证

*   所有外部输入必须经过 `validator` 验证
*   SQL 查询必须使用参数化（SQLx 默认强制）
*   永远不要将内部错误详情暴露给客户端

## 14. 代码规范 (Code Style)

### 14.1 命名规范

| 类型 | 规范 | 示例 |
| :--- | :--- | :--- |
| 文件名 | snake_case | `user_service.rs` |
| 模块名 | snake_case | `mod user_handler;` |
| 结构体/枚举 | PascalCase | `UserService`, `AppError` |
| Trait | PascalCase | `UserRepository` |
| 函数/方法 | snake_case | `find_by_id()` |
| 常量 | SCREAMING_SNAKE_CASE | `MAX_PAGE_SIZE` |

### 14.2 Clippy 规则

```toml
# Cargo.toml
[lints.clippy]
pedantic = "warn"
nursery = "warn"
unwrap_used = "deny"    # 禁止使用 unwrap()
expect_used = "warn"    # 警告使用 expect()
```

## 15. Redis 集成规范

### 15.1 Redis Client 选型

推荐使用 `fred` crate（高性能、功能完整），或 `redis` crate（官方维护）。

```toml
# Cargo.toml
[dependencies]
fred = { version = "9", features = ["enable-rustls", "partial-tracing"] }
```

### 15.2 缓存接口定义 (Domain Layer)

```rust
// crates/domain/src/cache/mod.rs
use crate::common::error::AppResult;
use std::time::Duration;

/// 缓存服务接口 - 定义在 Domain 层
#[trait_variant::make(CacheService: Send)]
pub trait LocalCacheService {
    async fn get<T: serde::de::DeserializeOwned>(&self, key: &str) -> AppResult<Option<T>>;
    async fn set<T: serde::Serialize + Sync>(&self, key: &str, value: &T, ttl: Option<Duration>) -> AppResult<()>;
    async fn delete(&self, key: &str) -> AppResult<()>;
    async fn exists(&self, key: &str) -> AppResult<bool>;
}
```

### 15.3 Redis 实现 (Infrastructure Layer)

```rust
// crates/infrastructure/src/redis/cache_impl.rs
use fred::prelude::*;
use std::time::Duration;
use bjd_domain::cache::CacheService;
use bjd_common::error::AppResult;

pub struct RedisCacheService {
    client: RedisClient,
}

impl RedisCacheService {
    pub async fn new(url: &str) -> AppResult<Self> {
        let config = RedisConfig::from_url(url)?;
        let client = RedisClient::new(config, None, None, None);
        client.connect();
        client.wait_for_connect().await?;
        Ok(Self { client })
    }
}

impl CacheService for RedisCacheService {
    async fn get<T: serde::de::DeserializeOwned>(&self, key: &str) -> AppResult<Option<T>> {
        let value: Option<String> = self.client.get(key).await?;
        match value {
            Some(v) => Ok(Some(serde_json::from_str(&v)?)),
            None => Ok(None),
        }
    }

    async fn set<T: serde::Serialize + Sync>(&self, key: &str, value: &T, ttl: Option<Duration>) -> AppResult<()> {
        let json = serde_json::to_string(value)?;
        match ttl {
            Some(duration) => {
                self.client.set(key, json.as_str(), Some(Expiration::EX(duration.as_secs() as i64)), None, false).await?;
            }
            None => {
                self.client.set(key, json.as_str(), None, None, false).await?;
            }
        }
        Ok(())
    }

    async fn delete(&self, key: &str) -> AppResult<()> {
        self.client.del(key).await?;
        Ok(())
    }

    async fn exists(&self, key: &str) -> AppResult<bool> {
        let result: i64 = self.client.exists(key).await?;
        Ok(result > 0)
    }
}
```

### 15.4 缓存使用模式

```rust
// Application Service 中使用缓存
use std::sync::Arc;
use std::time::Duration;

pub struct UserService {
    user_repo: Arc<dyn UserRepository>,
    cache: Arc<dyn CacheService>,
}

impl UserService {
    const USER_CACHE_TTL: Duration = Duration::from_secs(3600); // 1小时

    pub async fn get_user_by_id(&self, id: Ulid) -> AppResult<UserResponse> {
        let cache_key = format!("user:{}", id);

        // 1. 尝试从缓存获取
        if let Some(cached) = self.cache.get::<UserResponse>(&cache_key).await? {
            tracing::debug!(cache_key, "Cache hit");
            return Ok(cached);
        }

        // 2. 缓存未命中，查询数据库
        tracing::debug!(cache_key, "Cache miss");
        let user = self.user_repo
            .find_by_id(id)
            .await?
            .ok_or(AppError::NotFound("用户不存在".into()))?;

        let response = UserResponse::from(user);

        // 3. 写入缓存
        self.cache.set(&cache_key, &response, Some(Self::USER_CACHE_TTL)).await?;

        Ok(response)
    }

    /// 更新用户时清除缓存
    pub async fn update_user(&self, id: Ulid, dto: UpdateUserDto) -> AppResult<UserResponse> {
        // ... 业务逻辑 ...

        // 清除缓存
        let cache_key = format!("user:{}", id);
        self.cache.delete(&cache_key).await?;

        Ok(response)
    }
}
```

### 15.5 Redis 键命名规范

| 模式 | 示例 | 说明 |
| :--- | :--- | :--- |
| `{entity}:{id}` | `user:01HXYZ...` | 单实体缓存 |
| `{entity}:list:{filter}` | `user:list:active` | 列表缓存 |
| `session:{token}` | `session:abc123` | 会话管理 |
| `rate:{ip}:{endpoint}` | `rate:1.2.3.4:/api/login` | 限流计数 |
| `lock:{resource}` | `lock:order_create` | 分布式锁 |

### 15.6 分布式锁实现

```rust
use fred::prelude::*;
use std::time::Duration;

pub struct RedisLock {
    client: RedisClient,
}

impl RedisLock {
    /// 获取锁
    pub async fn acquire(
        &self,
        key: &str,
        ttl: Duration,
        retry_times: u32,
    ) -> AppResult<Option<String>> {
        let lock_value = ulid::Ulid::new().to_string();

        for _ in 0..retry_times {
            let result: Option<String> = self.client
                .set(
                    key,
                    lock_value.as_str(),
                    Some(Expiration::PX(ttl.as_millis() as i64)),
                    Some(SetOptions::NX),  // 仅当 key 不存在时设置
                    false,
                )
                .await?;

            if result.is_some() {
                return Ok(Some(lock_value));
            }

            tokio::time::sleep(Duration::from_millis(50)).await;
        }

        Ok(None)
    }

    /// 释放锁 (使用 Lua 脚本确保原子性)
    pub async fn release(&self, key: &str, lock_value: &str) -> AppResult<bool> {
        let script = r#"
            if redis.call('get', KEYS[1]) == ARGV[1] then
                return redis.call('del', KEYS[1])
            else
                return 0
            end
        "#;

        let result: i64 = self.client.eval(script, vec![key], vec![lock_value]).await?;
        Ok(result == 1)
    }
}
```

---

## 16. 性能优化建议

### 16.1 数据库优化

#### 连接池配置

```rust
use sqlx::postgres::PgPoolOptions;

let pool = PgPoolOptions::new()
    .max_connections(20)                    // 最大连接数
    .min_connections(5)                     // 最小保持连接数
    .acquire_timeout(Duration::from_secs(3)) // 获取连接超时
    .idle_timeout(Duration::from_secs(600)) // 空闲连接超时
    .max_lifetime(Duration::from_secs(1800)) // 连接最大生命周期
    .connect(&database_url)
    .await?;
```

**连接数计算公式**：`connections = (core_count * 2) + effective_spindle_count`

#### 批量操作

```rust
// ❌ 错误：循环中执行单条 INSERT
for user in users {
    sqlx::query!("INSERT INTO users ...", user.id).execute(&pool).await?;
}

// ✅ 正确：使用批量 INSERT
let mut query_builder = sqlx::QueryBuilder::new(
    "INSERT INTO users (id, username, email) "
);

query_builder.push_values(users.iter().take(1000), |mut b, user| {
    b.push_bind(&user.id)
     .push_bind(&user.username)
     .push_bind(&user.email);
});

query_builder.build().execute(&pool).await?;
```

#### 索引优化

```sql
-- 为高频查询字段创建索引
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_orders_user_created ON orders(user_id, created_at DESC);

-- 使用部分索引减少索引大小
CREATE INDEX idx_orders_pending ON orders(created_at) WHERE status = 'pending';
```

### 16.2 异步与并发

#### 避免阻塞操作

```rust
// ❌ 错误：在异步上下文中执行阻塞 I/O
async fn bad_example() {
    let content = std::fs::read_to_string("file.txt")?;  // 阻塞！
}

// ✅ 正确：使用 tokio 的异步 I/O
async fn good_example() {
    let content = tokio::fs::read_to_string("file.txt").await?;
}

// ✅ 或者：将阻塞操作放到专用线程池
async fn compute_example() {
    let result = tokio::task::spawn_blocking(|| {
        expensive_cpu_computation()
    }).await?;
}
```

#### 并发请求

```rust
use futures::future::join_all;

// 并发获取多个用户
pub async fn get_users_batch(&self, ids: Vec<Ulid>) -> AppResult<Vec<UserResponse>> {
    let futures: Vec<_> = ids
        .into_iter()
        .map(|id| self.get_user_by_id(id))
        .collect();

    let results = join_all(futures).await;

    results.into_iter().collect()
}

// 带并发限制
use futures::stream::{self, StreamExt};

pub async fn process_with_limit(&self, items: Vec<Item>) -> AppResult<Vec<Result>> {
    stream::iter(items)
        .map(|item| self.process_item(item))
        .buffer_unordered(10)  // 最多 10 个并发
        .collect::<Vec<_>>()
        .await
        .into_iter()
        .collect()
}
```

### 16.3 缓存策略

| 策略 | 适用场景 | 实现方式 |
| :--- | :--- | :--- |
| **Cache-Aside** | 通用场景 | 先查缓存，未命中查 DB 后写缓存 |
| **Write-Through** | 读多写少 | 写入时同时更新 DB 和缓存 |
| **Write-Behind** | 高写入量 | 写入缓存后异步批量写 DB |
| **Read-Through** | 简化代码 | 缓存层自动加载数据 |

#### 缓存雪崩防护

```rust
use rand::Rng;

/// 添加随机抖动防止缓存同时过期
fn get_ttl_with_jitter(base_ttl: Duration) -> Duration {
    let jitter = rand::thread_rng().gen_range(0..60);
    base_ttl + Duration::from_secs(jitter)
}
```

#### 缓存穿透防护

```rust
// 对不存在的数据也进行短期缓存（空值缓存）
pub async fn get_user_by_id(&self, id: Ulid) -> AppResult<Option<UserResponse>> {
    let cache_key = format!("user:{}", id);

    // 检查空值标记
    if self.cache.exists(&format!("{}:null", cache_key)).await? {
        return Ok(None);
    }

    if let Some(cached) = self.cache.get::<UserResponse>(&cache_key).await? {
        return Ok(Some(cached));
    }

    match self.user_repo.find_by_id(id).await? {
        Some(user) => {
            let response = UserResponse::from(user);
            self.cache.set(&cache_key, &response, Some(Duration::from_secs(3600))).await?;
            Ok(Some(response))
        }
        None => {
            // 缓存空值，TTL 较短
            self.cache.set(&format!("{}:null", cache_key), &true, Some(Duration::from_secs(60))).await?;
            Ok(None)
        }
    }
}
```

### 16.4 API 层优化

#### 分页必须限制

```rust
const MAX_PAGE_SIZE: i64 = 100;
const DEFAULT_PAGE_SIZE: i64 = 20;

#[derive(Debug, Deserialize)]
pub struct PaginationParams {
    #[serde(default = "default_page")]
    pub page: i64,
    #[serde(default = "default_page_size")]
    pub page_size: i64,
}

impl PaginationParams {
    pub fn validated(self) -> Self {
        Self {
            page: self.page.max(1),
            page_size: self.page_size.clamp(1, MAX_PAGE_SIZE),
        }
    }
}
```

#### 响应压缩

```rust
use tower_http::compression::CompressionLayer;

let app = Router::new()
    .merge(api_routes())
    .layer(CompressionLayer::new())  // 自动 gzip/brotli 压缩
    .with_state(state);
```

#### 请求超时

```rust
use tower_http::timeout::TimeoutLayer;

let app = Router::new()
    .merge(api_routes())
    .layer(TimeoutLayer::new(Duration::from_secs(30)))
    .with_state(state);
```

### 16.5 内存优化

#### 避免不必要的 Clone

```rust
// ❌ 浪费：不必要的 clone
fn process(data: &String) {
    let owned = data.clone();
    // ...
}

// ✅ 优化：使用引用或 Cow
use std::borrow::Cow;

fn process(data: Cow<'_, str>) {
    // 仅在需要修改时才会 clone
    let mut owned = data.into_owned();
}
```

#### 使用 `Arc` 共享大对象

```rust
// 配置、连接池等大对象使用 Arc 共享
#[derive(Clone)]
pub struct AppState {
    pub config: Arc<AppConfig>,           // 共享配置
    pub db_pool: PgPool,                   // PgPool 内部已是 Arc
    pub redis: Arc<RedisCacheService>,     // 共享 Redis 客户端
}
```

### 16.6 监控与诊断

```rust
// 使用 tracing 记录慢查询
#[instrument(skip(self), fields(duration_ms))]
pub async fn find_by_id(&self, id: Ulid) -> AppResult<Option<User>> {
    let start = std::time::Instant::now();

    let result = sqlx::query_as!(...).fetch_optional(&self.pool).await?;

    let duration = start.elapsed();
    Span::current().record("duration_ms", duration.as_millis() as i64);

    if duration > Duration::from_millis(100) {
        tracing::warn!(duration_ms = duration.as_millis(), "Slow query detected");
    }

    Ok(result)
}
```
