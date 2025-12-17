//! 用户仓储 Postgres 实现
//!
//! 注意：使用 sqlx::query_as 而非 sqlx::query_as! 宏，避免编译时数据库依赖。

use axum_common::AppResult;
use axum_domain::user::{entity::{User, UserStatus}, repo::UserRepository};
use sqlx::{PgPool, Row};
use ulid::Ulid;

use crate::models::user_model::UserModel;

/// Postgres 用户仓储实现
#[derive(Clone)]
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
        let result = sqlx::query_as::<_, UserModel>(
            r#"SELECT id, username, email, status, created_at, updated_at 
               FROM users WHERE id = $1"#,
        )
        .bind(id.to_string())
        .fetch_optional(&self.pool)
        .await?;

        Ok(result.map(UserModel::into_entity))
    }

    async fn find_by_email(&self, email: &str) -> AppResult<Option<User>> {
        let result = sqlx::query_as::<_, UserModel>(
            r#"SELECT id, username, email, status, created_at, updated_at 
               FROM users WHERE email = $1"#,
        )
        .bind(email)
        .fetch_optional(&self.pool)
        .await?;

        Ok(result.map(UserModel::into_entity))
    }

    async fn find_by_username(&self, username: &str) -> AppResult<Option<User>> {
        let result = sqlx::query_as::<_, UserModel>(
            r#"SELECT id, username, email, status, created_at, updated_at 
               FROM users WHERE username = $1"#,
        )
        .bind(username)
        .fetch_optional(&self.pool)
        .await?;

        Ok(result.map(UserModel::into_entity))
    }

    async fn save(&self, user: &User) -> AppResult<()> {
        let status = match user.status {
            UserStatus::Active => "active",
            UserStatus::Inactive => "inactive",
            UserStatus::Banned => "banned",
        };

        sqlx::query(
            r#"INSERT INTO users (id, username, email, status, created_at, updated_at) 
               VALUES ($1, $2, $3, $4, $5, $6)"#,
        )
        .bind(user.id.to_string())
        .bind(&user.username)
        .bind(&user.email)
        .bind(status)
        .bind(user.created_at)
        .bind(user.updated_at)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn update(&self, user: &User) -> AppResult<()> {
        let status = match user.status {
            UserStatus::Active => "active",
            UserStatus::Inactive => "inactive",
            UserStatus::Banned => "banned",
        };

        sqlx::query(
            r#"UPDATE users 
               SET username = $1, email = $2, status = $3, updated_at = $4 
               WHERE id = $5"#,
        )
        .bind(&user.username)
        .bind(&user.email)
        .bind(status)
        .bind(user.updated_at)
        .bind(user.id.to_string())
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete(&self, id: Ulid) -> AppResult<()> {
        sqlx::query(r#"DELETE FROM users WHERE id = $1"#)
            .bind(id.to_string())
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn find_all(&self, page: i64, page_size: i64) -> AppResult<(Vec<User>, i64)> {
        let offset = (page - 1) * page_size;

        // 查询总数
        let count_row = sqlx::query(r#"SELECT COUNT(*) as count FROM users"#)
            .fetch_one(&self.pool)
            .await?;
        let count: i64 = count_row.get("count");

        // 查询分页数据
        let users = sqlx::query_as::<_, UserModel>(
            r#"SELECT id, username, email, status, created_at, updated_at 
               FROM users 
               ORDER BY created_at DESC 
               LIMIT $1 OFFSET $2"#,
        )
        .bind(page_size)
        .bind(offset)
        .fetch_all(&self.pool)
        .await?;

        let users = users.into_iter().map(UserModel::into_entity).collect();
        Ok((users, count))
    }
}
