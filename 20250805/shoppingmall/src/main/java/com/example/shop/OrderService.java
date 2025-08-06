package com.example.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service    // 비즈니스 로직 처리 담당 클래스
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public void processOrder(String productName, int quantity) {
        System.out.println("🏪 주문 처리 시작!");
        System.out.println("상품: " + productName + ", 수량: " + quantity);

        // 재고 확인 (비즈니스 로직)
        System.out.println("📊 재고 확인 중...");

        // 가격 계산 (비즈니스 로직)
        int price = quantity * 10000;  // 개당 1만원
        System.out.println("💰 총 가격: " + price + "원");

        // 주문 정보 저장
        String orderInfo = productName + " " + quantity + "개 - " + price + "원";
        orderRepository.save(orderInfo);

        System.out.println("✅ 주문 처리 완료!");
    }

}
