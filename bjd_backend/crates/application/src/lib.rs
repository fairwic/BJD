//! # BJD Application
//!
//! 应用层，负责业务流程编排，协调领域对象和基础设施。

pub mod dtos;
pub mod services;

pub use services::user_service::UserService;
