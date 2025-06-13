# Inventory Management Service (Go)

This is a Go implementation of the Inventory Management Service using the Gin framework with AuthZed for authorization.

## Project Structure

```
svc/
├── cmd/                    # Application entry points
│   └── main.go             # Main application
├── internal/               # Private application code
│   ├── authz/              # AuthZed client integration
│   ├── controllers/        # HTTP request handlers
│   ├── models/             # Data structures
│   ├── middleware/         # HTTP middleware components
│   ├── routes/             # HTTP route definitions
│   └── services/           # Business logic
├── authzed/                # AuthZed schema definitions
│   └── schema.zed          # AuthZed schema for stock items
├── docker-compose.yml      # Docker Compose configuration for local development
├── load-schema.sh          # Script to load AuthZed schema into SpiceDB
├── Dockerfile              # Docker configuration
├── openapi.yaml            # OpenAPI specification
└── go.mod                  # Go module file
```

## Prerequisites

- Go 1.21 or later
- Docker and Docker Compose (for running with SpiceDB)

## Environment Variables

### Required Environment Variables

The service requires the following environment variables for AuthZed integration:

| Variable | Description | Default |
|----------|-------------|---------|
| `AUTHZED_ENDPOINT` | The endpoint of the AuthZed service (SpiceDB) | `localhost:50051` |
| `AUTHZED_TOKEN` | The API token for authenticating with the AuthZed service | `somerandomtoken` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port on which the service will listen | `8080` |
| `GIN_MODE` | The mode for the Gin framework (`debug` or `release`) | `debug` |

## Running the Application with AuthZed

### Using Docker Compose

1. Start the services (SpiceDB and the Go service):
   ```
   cd svc
   docker-compose up -d
   ```

2. Load the AuthZed schema into SpiceDB:
   ```
   cd svc
   chmod +x load-schema.sh
   ./load-schema.sh
   ```

### Local Development

1. Start SpiceDB using Docker Compose:
   ```
   cd svc
   docker-compose up -d spicedb
   ```

2. Load the AuthZed schema:
   ```
   cd svc
   chmod +x load-schema.sh
   ./load-schema.sh
   ```

3. Install dependencies:
   ```
   cd svc
   go mod download
   ```

4. Set environment variables and run the application:
   ```
   export AUTHZED_ENDPOINT=localhost:50051
   export AUTHZED_TOKEN=somerandomtoken
   go run cmd/main.go
   ```

## API Endpoints

- `GET /stock-items?userId=X` - List all stock items
- `POST /stock-item?name=X&manufacturer=Y&price=Z&stock=W&userId=U` - Add a new stock item
- `PUT /stock-item/:id?name=X&manufacturer=Y&price=Z&stock=W&userId=U` - Update an existing stock item
- `DELETE /stock-item/:id?userId=X` - Delete a stock item
- `GET /health` - Health check endpoint

## Authorization

The service uses AuthZed for authorization with the following permissions:

- Only the creator of a stock item can update or delete it
- Anyone can view stock items

When a stock item is created, a relationship is established in AuthZed between the user (from the `userId` query parameter) and the stock item, setting them as the creator.

## Running Tests

```
cd svc
go test ./...
```
