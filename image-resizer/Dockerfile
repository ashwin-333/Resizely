# Use the official Rust image as a build stage
FROM rust:1.58 AS builder

# Create a new empty shell project
WORKDIR /app
COPY . .

# Build the Rust project
RUN cargo build --release

# Use a smaller base image for the final stage
FROM debian:buster-slim
WORKDIR /app

# Copy the compiled Rust binary from the build stage
COPY --from=builder /app/target/release/image-resizer /app/image-resizer

# Expose port 8081 for the Rust service
EXPOSE 8081

# Run the Rust binary
CMD ["./image-resizer"]
