// Package services contains the business logic of the application
package services

import (
	"github.com/google/uuid"
	"github.com/ibm/inventory-management/internal/db"
	"github.com/ibm/inventory-management/internal/models"
)

// StockItemService defines the interface for stock item operations
type StockItemService interface {
	ListStockItems() []models.StockItem
	AddStockItem(name string, manufacturer string, price float64, stock int)
	UpdateStockItem(id string, name string, manufacturer string, price float64, stock int) error
	DeleteStockItem(id string) error
}

// StockItemServiceImpl is the implementation of StockItemService
type StockItemServiceImpl struct {
	db *db.InMemoryDB
}

// NewStockItemService creates a new instance of StockItemServiceImpl
func NewStockItemService() *StockItemServiceImpl {
	database := db.NewInMemoryDB()

	// Initialize with some sample data
	database.AddStockItem(models.StockItem{
		ID:           uuid.New().String(),
		Name:         "Item 1",
		Stock:        100,
		Price:        10.5,
		Manufacturer: "Sony",
	})

	database.AddStockItem(models.StockItem{
		ID:           uuid.New().String(),
		Name:         "Item 2",
		Stock:        150,
		Price:        100.5,
		Manufacturer: "Insignia",
	})

	database.AddStockItem(models.StockItem{
		ID:           uuid.New().String(),
		Name:         "Item 3",
		Stock:        10,
		Price:        1000.0,
		Manufacturer: "Panasonic",
	})

	return &StockItemServiceImpl{
		db: database,
	}
}

// ListStockItems returns all stock items
func (s *StockItemServiceImpl) ListStockItems() []models.StockItem {
	return s.db.GetAllStockItems()
}

// AddStockItem adds a new stock item
func (s *StockItemServiceImpl) AddStockItem(name string, manufacturer string, price float64, stock int) {
	newItem := models.StockItem{
		ID:           uuid.New().String(),
		Name:         name,
		Stock:        stock,
		Price:        price,
		Manufacturer: manufacturer,
	}
	s.db.AddStockItem(newItem)
}

// UpdateStockItem updates an existing stock item
func (s *StockItemServiceImpl) UpdateStockItem(id string, name string, manufacturer string, price float64, stock int) error {
	updatedItem := models.StockItem{
		ID:           id,
		Name:         name,
		Stock:        stock,
		Price:        price,
		Manufacturer: manufacturer,
	}

	success := s.db.UpdateStockItem(id, updatedItem)
	if !success {
		return &ItemNotFoundError{ID: id}
	}
	return nil
}

// DeleteStockItem deletes a stock item by ID
func (s *StockItemServiceImpl) DeleteStockItem(id string) error {
	success := s.db.DeleteStockItem(id)
	if !success {
		return &ItemNotFoundError{ID: id}
	}
	return nil
}

// ItemNotFoundError is returned when a stock item with the specified ID is not found
type ItemNotFoundError struct {
	ID string
}

func (e *ItemNotFoundError) Error() string {
	return "Stock item with ID " + e.ID + " not found"
}
