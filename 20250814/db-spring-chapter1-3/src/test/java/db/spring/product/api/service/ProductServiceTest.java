package db.spring.product.api.service;

import db.spring.product.api.dto.request.create.CreateProductBody;
import db.spring.product.api.dto.request.update.UpdateProductBody;
import db.spring.product.api.dto.response.ProductResponse;
import db.spring.product.domain.entity.Product;
import db.spring.product.domain.repository.ProductRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
class ProductServiceTest {

    private ProductService productService;
    private ProductRepository productRepository;

    @Autowired
    public ProductServiceTest(ProductService productService, ProductRepository  productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Test
    @DisplayName("상품 생성")
    public void createProduct() {
        CreateProductBody request = new CreateProductBody();
        request.setName("상품1");
        request.setSku("SKU-001");
        request.setUnitPrice(1000);

        ProductResponse response =  productService.createProduct(request);

        Assertions.assertThat(response.getId()).isNotNull();
    }

    @Test
    @DisplayName("상품 업데이트")
    public void updateProduct() {
        Product product = Product.create("상품1", "SKU-001", 1000);
        Product savedProduct =  productRepository.save(product);

        UpdateProductBody request = new UpdateProductBody();
        request.setName("수정상품1");
        request.setUnitPrice(2000);
        productService.updateProduct(savedProduct.getId(), request);

        ProductResponse findUpdateProduct =  productService.getProduct(savedProduct.getId());

        Assertions.assertThat(findUpdateProduct.getName()).isEqualTo("수정상품1");

    }
}