package db.spring.order.domain.entity;

import db.spring.customer.domain.entity.Customer;
import db.spring.order.domain.enums.PaymentMethod;
import db.spring.order.domain.enums.Status;
import db.spring.product.domain.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class OrderItemTest {
    @PersistenceContext
    EntityManager em;

    @Test
    public void testEntity() {
        Customer test1 = new Customer("test1", "test1@test.com");
        em.persist(test1);

        Order order = new Order("test-order-code-1", test1,
                ZonedDateTime.of(
                        LocalDateTime.of(2025, 8, 6, 11, 30),
                        ZoneId.of("Asia/Seoul")
                ).toInstant(),
                Status.PAID,
                PaymentMethod.CARD
        );

        Product product1 = Product.create(
                "SKU-001",
                "상품1",
                1000
        );

        Product product2 = Product.create(
                "SKU-002",
                "상품2",
                2000
        );

        em.persist(product1);
        em.persist(product2);

        em.persist(order);

        OrderItem orderItem1 = new OrderItem(order, product1, 3, 1000);
        OrderItem orderItem2 = new OrderItem(order, product2, 5, 2000);

        em.persist(orderItem1);
        em.persist(orderItem2);

        em.flush();
        em.clear();

        List<OrderItem> resultList = em.createQuery("SELECT oi FROM OrderItem oi", OrderItem.class)
                .getResultList();

        for (OrderItem orderItem : resultList) {
            System.out.println("orderItem = " + orderItem);
            System.out.println("orderItem.getProduct().getName() = " + orderItem.getProduct().getName());
//            System.out.println("orderItem.getUnitPrice() = " + orderItem.getUnitPrice());
        }
    }
}