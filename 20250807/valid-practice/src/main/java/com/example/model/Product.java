package com.example.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Max;

public class Product {
    @NotEmpty(message = "상품명을 입력해주세요")
    private String name;
    
    @NotNull(message = "가격을 입력해주세요")
    @Min(value = 1, message = "가격은 0보다 커야 합니다")
    @Max(value = 1000000, message = "가격이 너무 높습니다 (100만원 이하로 입력해주세요)")
    private Integer price;
    
    @NotEmpty(message = "상품 설명을 입력해주세요")
    private String description;
    
    @NotEmpty(message = "카테고리를 선택해주세요")
    private String category;

    public Product() {}

    public Product(String name, Integer price, String description, String category) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    
    // getter, setter 메서드들...
}
