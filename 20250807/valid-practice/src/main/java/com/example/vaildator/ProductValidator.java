package com.example.vaildator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.example.model.Product;

@Component
public class ProductValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Product.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Product product = (Product) target;

        // 복합 검증 로직
        if (product.getName() != null && product.getName().contains("금지어")) {
            errors.rejectValue("name", "product.name.forbidden");
        }

        // 카테고리별 가격 체크
        if ("electronics".equals(product.getCategory()) &&
            product.getPrice() != null && product.getPrice() < 10000) {
            errors.rejectValue("price", "product.electronics.minPrice");
        }
    }
}
