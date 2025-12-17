//! 用户 Handler

use axum::{
    extract::{Path, Query, State},
    Json,
};
use validator::Validate;

use axum_application::dtos::user_dto::{ListUsersQuery, UpdateUserDto, UserResponse};
use axum_common::{ApiResponse, AppError, AppResult, PagedResponse};
use axum_domain::{cache::CacheService, user::repo::UserRepository};

use crate::request::user_req::CreateUserRequest;
use crate::router::AppState;

/// 创建用户
pub async fn create_user<R, C>(
    State(state): State<AppState<R, C>>,
    Json(req): Json<CreateUserRequest>,
) -> AppResult<Json<ApiResponse<UserResponse>>>
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    // 参数校验
    req.validate()
        .map_err(|e| AppError::Validation(e.to_string()))?;

    // 调用应用服务
    let user = state.user_service.create_user(req.into_dto()).await?;

    Ok(Json(ApiResponse::success(user)))
}

/// 获取用户
pub async fn get_user<R, C>(
    State(state): State<AppState<R, C>>,
    Path(id): Path<String>,
) -> AppResult<Json<ApiResponse<UserResponse>>>
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    let ulid = id
        .parse()
        .map_err(|_| AppError::Validation("无效的用户ID".into()))?;

    let user = state.user_service.get_user_by_id(ulid).await?;

    Ok(Json(ApiResponse::success(user)))
}

/// 更新用户
pub async fn update_user<R, C>(
    State(state): State<AppState<R, C>>,
    Path(id): Path<String>,
    Json(dto): Json<UpdateUserDto>,
) -> AppResult<Json<ApiResponse<UserResponse>>>
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    let ulid = id
        .parse()
        .map_err(|_| AppError::Validation("无效的用户ID".into()))?;

    let user = state.user_service.update_user(ulid, dto).await?;

    Ok(Json(ApiResponse::success(user)))
}

/// 删除用户
pub async fn delete_user<R, C>(
    State(state): State<AppState<R, C>>,
    Path(id): Path<String>,
) -> AppResult<Json<ApiResponse<()>>>
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    let ulid = id
        .parse()
        .map_err(|_| AppError::Validation("无效的用户ID".into()))?;

    state.user_service.delete_user(ulid).await?;

    Ok(Json(ApiResponse::success(())))
}

/// 用户列表
pub async fn list_users<R, C>(
    State(state): State<AppState<R, C>>,
    Query(query): Query<ListUsersQuery>,
) -> AppResult<Json<ApiResponse<PagedResponse<UserResponse>>>>
where
    R: UserRepository + Clone + 'static,
    C: CacheService + Clone + 'static,
{
    let query = query.validated();
    let result = state.user_service.list_users(query.page, query.page_size).await?;

    Ok(Json(ApiResponse::success(result)))
}
