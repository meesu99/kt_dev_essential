package db.spring.product.domain.entity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
@SpringBootTest
class ProductTest {
    @PersistenceContext
    EntityManager em;

    @Test
    public void testEntity() {
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

        List<Product> products = em.createQuery("SELECT p FROM Product p", Product.class)
                .getResultList();


        for (Product product : products) {
            System.out.println("product = " + product);
            System.out.println("product.getName() = " + product.getName());
            System.out.println("product.getUnitPrice() = " + product.getUnitPrice());
            System.out.println("product.getSku() = " + product.getSku());
        }
    }
}