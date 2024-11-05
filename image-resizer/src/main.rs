use warp::Filter;
use image::imageops::FilterType;
use std::fs;

#[tokio::main] // This makes the main function async with tokio
async fn main() {
    // POST /resize endpoint
    let resize = warp::post()
        .and(warp::path("resize"))
        .and(warp::body::json())
        .map(|file_path: String| {
            let img = image::open(&file_path).expect("Failed to open image");
            let resized = img.resize(200, 200, FilterType::Nearest);
            let resized_path = format!("resized/{}", file_path);
            resized.save(&resized_path).expect("Failed to save resized image");

            warp::reply::json(&resized_path)
        });

    // Run the server
    warp::serve(resize).run(([127, 0, 0, 1], 8081)).await;
}
