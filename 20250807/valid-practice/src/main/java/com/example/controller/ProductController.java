package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import com.example.model.Product;

@Controller
public class ProductController {

    @GetMapping("/product/add")
    public String addProductForm(Model model) {
        model.addAttribute("product", new Product());
        return "product/add";
    }

    @PostMapping("/product/add")
    public String addProduct(@Valid @ModelAttribute("product") Product product,
                           BindingResult bindingResult,
                           Model model) {

        // 상품명 검증
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            bindingResult.rejectValue("name", "required.product.name");
        }

        // 가격 검증
        if (product.getPrice() == null) {
            bindingResult.rejectValue("price", "required.product.price");
        } else if (product.getPrice() <= 0) {
            bindingResult.rejectValue("price", "min.product.price");
        }

        // 설명 검증
        if (product.getDescription() == null || product.getDescription().trim().isEmpty()) {
            bindingResult.rejectValue("description", "required.product.description");
        }

        // 카테고리 검증
        if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
            bindingResult.rejectValue("category", "required.product.category");
        }

        // 비즈니스 로직 검증 (글로벌 오류)
        if (product.getPrice() != null && product.getPrice() > 1000000) {
            bindingResult.reject("price.tooHigh", new Object[]{}, "가격이 너무 높습니다");
        }

        if (bindingResult.hasErrors()) {
            return "product/add";
        }

        // 저장 성공
        model.addAttribute("message", "product.add.success");
        return "product/success";
    }
}
