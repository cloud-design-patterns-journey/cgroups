// Package authz provides AuthZed client integration for permission checks
package authz

import (
	"context"
	"fmt"
	"os"

	v1 "github.com/authzed/authzed-go/proto/authzed/api/v1"
	"github.com/authzed/authzed-go/v1"
	"github.com/authzed/grpcutil"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// Client is a wrapper around the AuthZed client
type Client struct {
	client *authzed.Client
}

// New creates a new AuthZed client
func New() (*Client, error) {
	// Get the AuthZed endpoint and token from environment variables
	endpoint := os.Getenv("AUTHZED_ENDPOINT")
	if endpoint == "" {
		endpoint = "localhost:50051" // Default to local SpiceDB instance
	}

	token := os.Getenv("AUTHZED_TOKEN")
	if token == "" {
		// In a real application, this would be an error, but for testing purposes
		// we'll use a default token
		token = "somerandomtoken"
	}

	// Create a connection to the AuthZed service
	client, err := authzed.NewClient(endpoint, grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpcutil.WithInsecureBearerToken(token))

	if err != nil {
		return nil, fmt.Errorf("failed to create AuthZed client: %w", err)
	}

	return &Client{client: client}, nil
}

// CheckPermission checks if a user has the specified permission on a resource
func (c *Client) CheckPermission(ctx context.Context, userId, resourceType, resourceId, permission string) (bool, error) {
	response, err := c.client.CheckPermission(ctx, &v1.CheckPermissionRequest{
		Resource: &v1.ObjectReference{
			ObjectType: resourceType,
			ObjectId:   resourceId,
		},
		Permission: permission,
		Subject: &v1.SubjectReference{
			Object: &v1.ObjectReference{
				ObjectType: "user",
				ObjectId:   userId,
			},
		},
	})

	if err != nil {
		return false, fmt.Errorf("failed to check permission: %w", err)
	}

	return response.Permissionship == v1.CheckPermissionResponse_PERMISSIONSHIP_HAS_PERMISSION, nil
}

// WriteRelationship creates a relationship between a user and a resource
func (c *Client) WriteRelationship(ctx context.Context, userId, resourceType, resourceId, relation string) error {
	_, err := c.client.WriteRelationships(ctx, &v1.WriteRelationshipsRequest{
		Updates: []*v1.RelationshipUpdate{
			{
				Operation: v1.RelationshipUpdate_OPERATION_CREATE,
				Relationship: &v1.Relationship{
					Resource: &v1.ObjectReference{
						ObjectType: resourceType,
						ObjectId:   resourceId,
					},
					Relation: relation,
					Subject: &v1.SubjectReference{
						Object: &v1.ObjectReference{
							ObjectType: "user",
							ObjectId:   userId,
						},
					},
				},
			},
		},
	})

	if err != nil {
		return fmt.Errorf("failed to write relationship: %w", err)
	}

	return nil
}

// DeleteRelationship removes a relationship between a user and a resource
func (c *Client) DeleteRelationship(ctx context.Context, userId, resourceType, resourceId, relation string) error {
	_, err := c.client.WriteRelationships(ctx, &v1.WriteRelationshipsRequest{
		Updates: []*v1.RelationshipUpdate{
			{
				Operation: v1.RelationshipUpdate_OPERATION_DELETE,
				Relationship: &v1.Relationship{
					Resource: &v1.ObjectReference{
						ObjectType: resourceType,
						ObjectId:   resourceId,
					},
					Relation: relation,
					Subject: &v1.SubjectReference{
						Object: &v1.ObjectReference{
							ObjectType: "user",
							ObjectId:   userId,
						},
					},
				},
			},
		},
	})

	if err != nil {
		return fmt.Errorf("failed to delete relationship: %w", err)
	}

	return nil
}

// GetClient returns the underlying AuthZed client
func (c *Client) GetClient() *authzed.Client {
	return c.client
}
