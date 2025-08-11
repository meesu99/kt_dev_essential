package com.example.maple_shop.model;

import java.util.ArrayList;
import java.util.List;

public class Player {
    private Long id;
    private String name;
    private int level;
    private int meso;  // 메소 (게임 내 화폐)
    private List<InventoryItem> inventory;
    
    public Player() {
        this.inventory = new ArrayList<>();
    }
    
    public Player(Long id, String name, int level, int meso) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.meso = meso;
        this.inventory = new ArrayList<>();
    }
    
    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
    
    public int getMeso() { return meso; }
    public void setMeso(int meso) { this.meso = meso; }
    
    public List<InventoryItem> getInventory() { return inventory; }
    public void setInventory(List<InventoryItem> inventory) { this.inventory = inventory; }
    
    // 인벤토리 관리 메서드
    public void addItem(Item item, int quantity) {
        // 이미 가지고 있는 아이템인지 확인
        for (InventoryItem invItem : inventory) {
            if (invItem.getItem().getId().equals(item.getId())) {
                invItem.setQuantity(invItem.getQuantity() + quantity);
                return;
            }
        }
        // 새로운 아이템 추가
        inventory.add(new InventoryItem(item, quantity));
    }
    
    public boolean removeItem(Long itemId, int quantity) {
        for (InventoryItem invItem : inventory) {
            if (invItem.getItem().getId().equals(itemId)) {
                if (invItem.getQuantity() >= quantity) {
                    invItem.setQuantity(invItem.getQuantity() - quantity);
                    if (invItem.getQuantity() == 0) {
                        inventory.remove(invItem);
                    }
                    return true;
                }
                return false; // 수량 부족
            }
        }
        return false; // 아이템 없음
    }
    
    public InventoryItem findItem(Long itemId) {
        return inventory.stream()
                .filter(invItem -> invItem.getItem().getId().equals(itemId))
                .findFirst()
                .orElse(null);
    }
}
