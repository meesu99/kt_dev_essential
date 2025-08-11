package com.example.maple_shop.model;

public class Item {
    private Long id;
    private String name;        // 아이템 이름
    private int price;          // 메소 가격
    private String itemType;    // 무기 종류 (검, 활, 지팡이 등)
    private int attackPower;    // 공격력
    private int requiredLevel;  // 착용 레벨 제한
    private String description; // 아이템 설명
    
    // 강화 시스템 관련 필드
    private int enhancementLevel;  // 강화 레벨 (0~15)
    private int maxEnhancementLevel; // 최대 강화 레벨
    private boolean isDestroyed;    // 강화 실패로 파괴됨

    // 기본 생성자
    public Item() {
        this.enhancementLevel = 0;
        this.maxEnhancementLevel = 15;
        this.isDestroyed = false;
    }

    // 모든 필드 생성자
    public Item(Long id, String name, int price, String itemType,
                int attackPower, int requiredLevel, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.itemType = itemType;
        this.attackPower = attackPower;
        this.requiredLevel = requiredLevel;
        this.description = description;
        this.enhancementLevel = 0;
        this.maxEnhancementLevel = 15;
        this.isDestroyed = false;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public int getAttackPower() { return attackPower; }
    public void setAttackPower(int attackPower) { this.attackPower = attackPower; }

    public int getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(int requiredLevel) { this.requiredLevel = requiredLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public int getEnhancementLevel() { return enhancementLevel; }
    public void setEnhancementLevel(int enhancementLevel) { this.enhancementLevel = enhancementLevel; }
    
    public int getMaxEnhancementLevel() { return maxEnhancementLevel; }
    public void setMaxEnhancementLevel(int maxEnhancementLevel) { this.maxEnhancementLevel = maxEnhancementLevel; }
    
    public boolean isDestroyed() { return isDestroyed; }
    public void setDestroyed(boolean destroyed) { isDestroyed = destroyed; }
    
    // 강화된 공격력 계산
    public int getEnhancedAttackPower() {
        if (isDestroyed) return 0;
        
        // 강화 레벨에 따른 공격력 증가
        // +0: 기본 공격력, +1~+10: +2씩, +11~+15: +3씩
        int bonus = 0;
        if (enhancementLevel <= 10) {
            bonus = enhancementLevel * 2;
        } else {
            bonus = 20 + (enhancementLevel - 10) * 3;
        }
        
        return attackPower + bonus;
    }
    
    // 강화된 아이템 이름
    public String getEnhancedName() {
        if (isDestroyed) return name + " (파괴됨)";
        if (enhancementLevel == 0) return name;
        return name + " +" + enhancementLevel;
    }
    
    // 강화 가능 여부 확인
    public boolean canEnhance() {
        return !isDestroyed && enhancementLevel < maxEnhancementLevel;
    }
}
