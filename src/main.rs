use std::net::{Ipv4Addr, SocketAddr};

use axum::{http::StatusCode, routing::get_service, Router};
use tower_http::services::ServeDir;

async fn handle_io_error(error: std::io::Error) -> (StatusCode, String) {
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        format!("Internal server error: {error}"),
    )
}

#[tokio::main]
async fn main() {
    let port = std::env::var("PORT")
        .expect("$PORT is not present")
        .parse()
        .expect("$PORT is not a number");
    let addr = SocketAddr::from((Ipv4Addr::LOCALHOST, port));

    let app = Router::new().nest(
        "/",
        get_service(ServeDir::new("iter-rs/dist")).handle_error(handle_io_error),
    );

    eprintln!("App running on {addr}");

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
