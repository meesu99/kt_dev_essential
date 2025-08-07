package com.example.service;

import org.springframework.stereotype.Service;
import com.example.model.Product;
import com.example.dto.ProductCreateDto;

@Service
public class ProductService {
    
    public Product createProduct(ProductCreateDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        
        return product;
    }
}
