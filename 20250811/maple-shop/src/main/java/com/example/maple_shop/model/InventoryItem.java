package com.example.maple_shop.model;

public class InventoryItem {
    private Item item;
    private int quantity;
    
    public InventoryItem() {}
    
    public InventoryItem(Item item, int quantity) {
        this.item = item;
        this.quantity = quantity;
    }
    
    // Getter & Setter
    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }
    
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
