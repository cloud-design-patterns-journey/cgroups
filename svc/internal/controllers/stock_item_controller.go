// Package controllers handles HTTP requests and responses
package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/ibm/inventory-management/internal/services"
)

// StockItemController handles HTTP requests for stock items
type StockItemController struct {
	service services.StockItemService
}

// NewStockItemController creates a new instance of StockItemController
func NewStockItemController(service services.StockItemService) *StockItemController {
	return &StockItemController{
		service: service,
	}
}

// ListStockItems handles GET requests to list all stock items
func (c *StockItemController) ListStockItems(ctx *gin.Context) {
	items := c.service.ListStockItems()
	ctx.JSON(http.StatusOK, items)
}

// AddStockItem handles POST requests to add a new stock item
func (c *StockItemController) AddStockItem(ctx *gin.Context) {
	name := ctx.Query("name")
	manufacturer := ctx.Query("manufacturer")
	priceStr := ctx.Query("price")
	stockStr := ctx.Query("stock")

	if name == "" || manufacturer == "" || priceStr == "" || stockStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Missing required parameters"})
		return
	}

	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price format"})
		return
	}

	stock, err := strconv.Atoi(stockStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid stock format"})
		return
	}

	c.service.AddStockItem(name, manufacturer, price, stock)
	ctx.JSON(http.StatusOK, gin.H{"message": "Stock item added successfully"})
}

// UpdateStockItem handles PUT requests to update an existing stock item
func (c *StockItemController) UpdateStockItem(ctx *gin.Context) {
	id := ctx.Param("id")
	name := ctx.Query("name")
	manufacturer := ctx.Query("manufacturer")
	priceStr := ctx.Query("price")
	stockStr := ctx.Query("stock")

	if id == "" || name == "" || manufacturer == "" || priceStr == "" || stockStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Missing required parameters"})
		return
	}

	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price format"})
		return
	}

	stock, err := strconv.Atoi(stockStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid stock format"})
		return
	}

	err = c.service.UpdateStockItem(id, name, manufacturer, price, stock)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Stock item updated successfully"})
}

// DeleteStockItem handles DELETE requests to delete a stock item
func (c *StockItemController) DeleteStockItem(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Missing ID parameter"})
		return
	}

	err := c.service.DeleteStockItem(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Stock item deleted successfully"})
}
