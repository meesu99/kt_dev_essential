package com.example.product.repository;

import com.example.product.model.Product;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

// 데이터 저장과 관련한 작업은 Repository에서 한다고 했죠?
// Controller -> Service -> Repository 
@Repository
public class ProductRepository {

    private final Map<Long, Product> products = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public ProductRepository() {
        // 초기 데이터 추가
        save(new Product(null, "노트북", "고성능 게이밍 노트북", 1500000, 10, java.time.LocalDateTime.now()));
        save(new Product(null, "스마트폰", "최신형 5G 스마트폰", 1200000, 20, java.time.LocalDateTime.now()));
        save(new Product(null, "태블릿", "대화면 태블릿 PC", 800000, 15, java.time.LocalDateTime.now()));
        save(new Product(null, "이어폰", "무선 블루투스 이어폰", 300000, 30, java.time.LocalDateTime.now()));
    }

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Product findById(Long id) {
        return products.get(id);
    }

    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(idGenerator.getAndIncrement());
        }
        products.put(product.getId(), product);
        return product;
    }

    public void deleteById(Long id) {
        products.remove(id);
    }

    public boolean existsById(Long id) {
        return products.containsKey(id);
    }
}
