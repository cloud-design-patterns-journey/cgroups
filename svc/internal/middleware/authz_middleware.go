// Package middleware contains HTTP middleware functions for the API
package middleware

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ibm/inventory-management/internal/authz"
)

// AuthZMiddleware creates a middleware for checking permissions
func AuthZMiddleware(authzClient *authz.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Skip authorization for endpoints that don't need it
		if c.Request.Method == http.MethodGet || c.FullPath() == "/health" {
			c.Next()
			return
		}

		userId := c.Query("userId")
		if userId == "" {
			userId = "anonymous"
		}

		// For operations that modify a specific stock item
		if c.Request.Method == http.MethodPut || c.Request.Method == http.MethodDelete {
			resourceId := c.Param("id")
			if resourceId == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Missing resource ID"})
				c.Abort()
				return
			}

			var permission string
			if c.Request.Method == http.MethodPut {
				permission = "update"
			} else {
				permission = "delete"
			}

			// Check if the user has permission
			allowed, err := authzClient.CheckPermission(c.Request.Context(), userId, "stock_item", resourceId, permission)
			if err != nil {
				log.Printf("Failed to check permission: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Authorization service unavailable"})
				c.Abort()
				return
			}

			if !allowed {
				c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to perform this action"})
				c.Abort()
				return
			}
		}

		c.Next()
	}
}

// StoreCreatorRelationship middleware to store the creator relationship for new stock items
func StoreCreatorRelationship(authzClient *authz.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Only process POST requests to create new stock items
		if c.Request.Method != http.MethodPost || c.FullPath() != "/stock-item" {
			c.Next()
			return
		}

		// Store the original context to use it later
		originalContext := c.Request.Context()

		// Let the handler process the request
		c.Next()

		// Check if there was an error in the handler
		if c.Writer.Status() >= 400 {
			return
		}

		// Get the user ID
		userId := c.Query("userId")
		if userId == "" {
			userId = "anonymous"
		}

		// Extract the new stock item ID from the response
		// In a real application, you would need to get the ID from the response
		// For this middleware, we would need to modify the controller to return the ID
		// This is a placeholder for the actual implementation
		// resourceId := ... // Get the resource ID

		// TODO: Get the actual resource ID from the controller
		// For now, we'll assume it's available as a context value
		resourceId, exists := c.Get("newStockItemId")
		if !exists {
			log.Println("Resource ID not found in context after creating stock item")
			return
		}

		// Create the creator relationship
		err := authzClient.WriteRelationship(originalContext, userId, "stock_item", resourceId.(string), "creator")
		if err != nil {
			log.Printf("Failed to write creator relationship: %v", err)
			// We don't want to fail the request if the relationship creation fails
			// Just log the error
		}
	}
}
