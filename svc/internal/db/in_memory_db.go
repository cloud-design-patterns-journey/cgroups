// Package db provides data storage functionality
package db

import (
	"sync"

	"github.com/ibm/inventory-management/internal/models"
)

// InMemoryDB is a simple in-memory database implementation
type InMemoryDB struct {
	stockItems []models.StockItem
	mutex      sync.RWMutex
}

// NewInMemoryDB creates a new in-memory database
func NewInMemoryDB() *InMemoryDB {
	return &InMemoryDB{
		stockItems: []models.StockItem{},
		mutex:      sync.RWMutex{},
	}
}

// GetAllStockItems returns all stock items
func (db *InMemoryDB) GetAllStockItems() []models.StockItem {
	db.mutex.RLock()
	defer db.mutex.RUnlock()

	// Return a copy to avoid external modifications
	items := make([]models.StockItem, len(db.stockItems))
	copy(items, db.stockItems)
	return items
}

// AddStockItem adds a new stock item
func (db *InMemoryDB) AddStockItem(item models.StockItem) {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	db.stockItems = append(db.stockItems, item)
}

// UpdateStockItem updates an existing stock item
func (db *InMemoryDB) UpdateStockItem(id string, updatedItem models.StockItem) bool {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	for i, item := range db.stockItems {
		if item.ID == id {
			updatedItem.ID = id // Ensure ID doesn't change
			db.stockItems[i] = updatedItem
			return true
		}
	}
	return false
}

// DeleteStockItem deletes a stock item by ID
func (db *InMemoryDB) DeleteStockItem(id string) bool {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	for i, item := range db.stockItems {
		if item.ID == id {
			// Remove the item from the slice
			db.stockItems = append(db.stockItems[:i], db.stockItems[i+1:]...)
			return true
		}
	}
	return false
}
