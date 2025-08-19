package db.spring.product.domain.repository;

import db.spring.product.domain.entity.Product;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ProductRepositoryTest {

    @Autowired  EntityManager em;

    @Autowired  ProductRepository productRepository;

    @Test
    public void testProduct() {
        System.out.println("productRepository.getClass() = " + productRepository.getClass());
        Product product = Product.create(
                "SKU-001",
                "상품1",
                1000
        );

        Product savedProduct = productRepository.save(product);

        Product findProduct = productRepository.findById(savedProduct.getId()).get();

        Assertions.assertThat(findProduct).isEqualTo(savedProduct);
        Assertions.assertThat(findProduct.getSku()).isEqualTo(savedProduct.getSku());
        Assertions.assertThat(findProduct.getId()).isEqualTo(product.getId());
    }


    @Test
    public void basicTest() {
        Product product = Product.create(
                "SKU-001",
                "상품1",
                1000
        );
        productRepository.save(product);

        Product findProduct = productRepository.findBySku(product.getSku()).get();
        Assertions.assertThat(findProduct).isEqualTo(product);
    }

    @Test
    public void basicCRUD() {
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

        productRepository.save(product1);
        productRepository.save(product2);

        // 단건 조회 검증
        Product findProduct1 = productRepository.findById(product1.getId()).get();
        Product findProduct2 = productRepository.findById(product2.getId()).get();

        Assertions.assertThat(findProduct1).isEqualTo(product1);
        Assertions.assertThat(findProduct2).isEqualTo(product2);

        List<Product> all = productRepository.findAll();
        Assertions.assertThat(all.size()).isEqualTo(2);

        long count = productRepository.count();
        Assertions.assertThat(count).isEqualTo(2);

        // 삭제 검증
        productRepository.delete(product1);
        productRepository.delete(product2);

        long deletedCount = productRepository.count();
        Assertions.assertThat(deletedCount).isEqualTo(0);
    }
}