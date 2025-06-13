// Package routes sets up the HTTP routes for the application
package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/ibm/inventory-management/internal/controllers"
	"github.com/ibm/inventory-management/internal/middleware"
)

// SetupRouter configures the HTTP routes for the application
func SetupRouter(stockItemController *controllers.StockItemController) *gin.Engine {
	router := gin.Default()

	// Apply middleware
	router.Use(middleware.CorsMiddleware())
	router.Use(middleware.LoggingMiddleware())

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
