#[macro_use]
extern crate diesel;
#[macro_use]
extern crate log;

pub mod app;
pub mod db;
pub mod http;
pub mod models;

/// An autogenerated mapping between database tables and models.
pub mod schema;
