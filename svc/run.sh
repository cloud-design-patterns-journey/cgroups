#!/bin/zsh

# Build and run script for inventory management service

set -e  # Exit on error

SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR"

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Building inventory service ===${NC}"
go mod tidy
go build -o ./bin/inventory-service ./cmd/main.go

echo -e "${GREEN}=== Running inventory service ===${NC}"
./bin/inventory-service
