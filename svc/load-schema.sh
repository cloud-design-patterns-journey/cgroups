#!/bin/bash

# This script loads the AuthZed schema into SpiceDB

# Check if SpiceDB is running
echo "Checking if SpiceDB is running..."
if ! curl -s http://localhost:8443/healthz > /dev/null; then
  echo "SpiceDB is not running. Please start SpiceDB first with:"
  echo "docker compose up -d spicedb"
  exit 1
fi

# Wait for SpiceDB to be ready
echo "Waiting for SpiceDB to be ready..."
while ! curl -s http://localhost:8443/healthz > /dev/null; do
  echo "Waiting for SpiceDB..."
  sleep 2
done

# Load the schema
echo "Loading schema into SpiceDB..."
curl -X POST http://localhost:8443/v1/schema/write \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer somerandomtoken" \
  -d @- << EOF
{
  "schema": "$(cat ./authzed/schema.zed | tr -d '\n')"
}
EOF

echo -e "\nSchema loaded successfully!"
