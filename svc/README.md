# Inventory Management Service (Go)

This is a Go implementation of the Inventory Management Service using the Gin framework.

## Project Structure

```
go-svc/
├── cmd/                    # Application entry points
│   └── main.go             # Main application
├── internal/               # Private application code
│   ├── controllers/        # HTTP request handlers
│   ├── models/             # Data structures
│   ├── routes/             # HTTP route definitions
│   └── services/           # Business logic
├── Dockerfile              # Docker configuration
└── go.mod                  # Go module file
```

## Prerequisites

- Go 1.21 or later
- Docker (optional, for containerization)

## Running the Application

### Local Development

1. Install dependencies:
   ```
   cd go-svc
   go mod download
   ```

2. Run the application:
   ```
   go run cmd/main.go
   ```

The server will start on port 8080.

### Using Docker

1. Build the Docker image:
   ```
   cd go-svc
   docker build -t inventory-service .
   ```

2. Run the container:
   ```
   docker run -p 8080:8080 inventory-service
   ```

## API Endpoints

- `GET /stock-items` - List all stock items
- `POST /stock-item?name=X&manufacturer=Y&price=Z&stock=W` - Add a new stock item
- `PUT /stock-item/:id?name=X&manufacturer=Y&price=Z&stock=W` - Update an existing stock item
- `DELETE /stock-item/:id` - Delete a stock item

## Running Tests

```
cd go-svc
go test ./...
```
