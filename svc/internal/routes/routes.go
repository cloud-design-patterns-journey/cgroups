// Package routes sets up the HTTP routes for the application
package routes

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/ibm/inventory-management/internal/authz"
	"github.com/ibm/inventory-management/internal/controllers"
	"github.com/ibm/inventory-management/internal/middleware"
)

// SetupRouter configures the HTTP routes for the application
func SetupRouter(stockItemController *controllers.StockItemController) *gin.Engine {
	router := gin.Default()

	// Initialize AuthZed client
	authzClient, err := authz.New()
	if err != nil {
		log.Printf("Warning: Failed to initialize AuthZed client: %v", err)
		log.Println("Authorization checks will be skipped")
	}

	// Apply middleware
	router.Use(middleware.CorsMiddleware())
	router.Use(middleware.LoggingMiddleware())

	// Apply AuthZ middleware if client is available
	if authzClient != nil {
		router.Use(middleware.AuthZMiddleware(authzClient))
		router.Use(middleware.StoreCreatorRelationship(authzClient))
	}

	// Set up routes
	router.GET("/stock-items", stockItemController.ListStockItems)
	router.POST("/stock-item", stockItemController.AddStockItem)
	router.PUT("/stock-item/:id", stockItemController.UpdateStockItem)
	router.DELETE("/stock-item/:id", stockItemController.DeleteStockItem)

	// Add a health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "UP"})
	})

	return router
}
