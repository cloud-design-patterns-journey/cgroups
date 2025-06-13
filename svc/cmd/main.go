// Package main is the entry point for the application
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ibm/inventory-management/internal/config"
	"github.com/ibm/inventory-management/internal/controllers"
	"github.com/ibm/inventory-management/internal/routes"
	"github.com/ibm/inventory-management/internal/services"
)

func main() {
	// Load configuration
	cfg := config.NewConfig()

	// Create service
	stockItemService := services.NewStockItemService()

	// Create controller
	stockItemController := controllers.NewStockItemController(stockItemService)

	// Set up router
	router := routes.SetupRouter(stockItemController)

	// Create server
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Port),
		Handler: router,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Starting server on port %d in %s mode\n", cfg.Port, cfg.Env)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a deadline to wait for current operations to complete
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exiting")
}
