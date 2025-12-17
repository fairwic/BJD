//! # BJD Domain
//!
//! 纯领域层，包含实体、值对象、仓储接口。
//! 此 crate 不依赖任何基础设施（数据库、Web 框架等）。

pub mod cache;
pub mod user;

// Re-export commonly used types
pub use user::entity::User;
pub use user::repo::UserRepository;
