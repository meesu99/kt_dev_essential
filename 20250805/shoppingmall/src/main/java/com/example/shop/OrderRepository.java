package com.example.shop;

import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {
    public void save(String orderInfo) {
        System.out.println("📦 주문 정보 저장: " + orderInfo);
        System.out.println("💾 데이터베이스에 저장 완료!");
    }

    public String findOrder(int orderId) {
        System.out.println("🔍 주문 조회: " + orderId);
        return "주문번호 " + orderId + "의 상품";
    }
}
