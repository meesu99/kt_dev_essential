package com.example.maple_shop.model;

public class Item {
    private Long id;
    private String name;        // 아이템 이름
    private int price;          // 메소 가격
    private String itemType;    // 무기 종류 (검, 활, 지팡이 등)
    private int attackPower;    // 공격력
    private int requiredLevel;  // 착용 레벨 제한
    private String description; // 아이템 설명

    // 기본 생성자
    public Item() {}

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
}
