package services_test

import (
	"testing"

	"github.com/ibm/inventory-management/internal/services"
)

func TestStockItemService(t *testing.T) {
	service := services.NewStockItemService()

	// Test ListStockItems
	items := service.ListStockItems()
	if len(items) != 3 {
		t.Errorf("Expected 3 initial items, got %d", len(items))
	}

	// Test AddStockItem
	service.AddStockItem("Test Item", "Test Manufacturer", 99.99, 50)

	items = service.ListStockItems()
	if len(items) != 4 {
		t.Errorf("Expected 4 items after adding one, got %d", len(items))
	}

	// Get the ID of the newly added item
	newItemID := items[3].ID

	// Test UpdateStockItem
	err := service.UpdateStockItem(newItemID, "Updated Item", "Updated Manufacturer", 199.99, 100)
	if err != nil {
		t.Errorf("Error updating item: %v", err)
	}

	items = service.ListStockItems()
	updatedItem := items[3]
	if updatedItem.Name != "Updated Item" || updatedItem.Manufacturer != "Updated Manufacturer" ||
		updatedItem.Price != 199.99 || updatedItem.Stock != 100 {
		t.Errorf("Item not updated correctly")
	}

	// Test DeleteStockItem
	err = service.DeleteStockItem(newItemID)
	if err != nil {
		t.Errorf("Error deleting item: %v", err)
	}

	items = service.ListStockItems()
	if len(items) != 3 {
		t.Errorf("Expected 3 items after deleting one, got %d", len(items))
	}

	// Test deleting non-existent item
	err = service.DeleteStockItem("non-existent-id")
	if err == nil {
		t.Errorf("Expected error when deleting non-existent item, got nil")
	}
}
