// Package controllers_test contains tests for the controllers package
package controllers_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/ibm/inventory-management/internal/controllers"
	"github.com/ibm/inventory-management/internal/models"
	"github.com/ibm/inventory-management/internal/services"
)

func setupTestRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)

	// Create service
	stockItemService := services.NewStockItemService()

	// Create controller
	stockItemController := controllers.NewStockItemController(stockItemService)

	// Setup router
	router := gin.Default()
	router.GET("/stock-items", stockItemController.ListStockItems)
	router.POST("/stock-item", stockItemController.AddStockItem)
	router.PUT("/stock-item/:id", stockItemController.UpdateStockItem)
	router.DELETE("/stock-item/:id", stockItemController.DeleteStockItem)

	return router
}

func TestListStockItems(t *testing.T) {
	router := setupTestRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/stock-items", nil)
	router.ServeHTTP(w, req)

	// Check response
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Parse response body
	var items []models.StockItem
	err := json.Unmarshal(w.Body.Bytes(), &items)
	if err != nil {
		t.Errorf("Error parsing response body: %v", err)
	}

	// Check initial data
	if len(items) != 3 {
		t.Errorf("Expected 3 items, got %d", len(items))
	}
}

func TestAddStockItem(t *testing.T) {
	router := setupTestRouter()

	// Add a new item
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/stock-item?name=Test+Item&manufacturer=Test+Manufacturer&price=99.99&stock=50", nil)
	router.ServeHTTP(w, req)

	// Check response
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Verify the item was added
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/stock-items", nil)
	router.ServeHTTP(w, req)

	var items []models.StockItem
	err := json.Unmarshal(w.Body.Bytes(), &items)
	if err != nil {
		t.Errorf("Error parsing response body: %v", err)
	}

	if len(items) != 4 {
		t.Errorf("Expected 4 items after adding one, got %d", len(items))
	}

	// Check the newly added item
	newItem := items[3]
	if newItem.Name != "Test Item" || newItem.Manufacturer != "Test Manufacturer" ||
		newItem.Price != 99.99 || newItem.Stock != 50 {
		t.Errorf("Item not added correctly: %+v", newItem)
	}
}
