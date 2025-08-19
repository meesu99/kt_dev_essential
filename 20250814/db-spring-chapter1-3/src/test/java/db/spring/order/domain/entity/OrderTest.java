package db.spring.order.domain.entity;

import db.spring.customer.domain.entity.Customer;
import db.spring.order.domain.enums.PaymentMethod;
import db.spring.order.domain.enums.Status;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Transactional
@SpringBootTest
class OrderTest {
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

        em.persist(order);

        List<Order> orders = em.createQuery("select o from Order o", Order.class)
                .getResultList();

        for (Order order1 : orders) {
            System.out.println("order1 = " + order1);
        }
    }
}