// Package models contains the data structures used by the application
package models

// StockItem represents an item in the inventory
type StockItem struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Stock        int     `json:"stock"`
	Price        float64 `json:"price"`
	Manufacturer string  `json:"manufacturer"`
}
