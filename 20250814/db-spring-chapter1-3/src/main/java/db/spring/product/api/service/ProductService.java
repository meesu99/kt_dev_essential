package db.spring.product.api.service;

import db.spring.customer.api.dto.request.read.ReadCustomerParams;
import db.spring.product.api.dto.request.create.CreateProductBody;
import db.spring.product.api.dto.request.delete.DeleteBulkProductBody;
import db.spring.product.api.dto.request.read.ReadProductsParams;
import db.spring.product.api.dto.request.update.UpdateProductBody;
import db.spring.product.api.dto.response.ProductResponse;
import db.spring.product.domain.entity.Product;
import db.spring.product.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional
    public ProductResponse createProduct(CreateProductBody request) {
        Product product = productRepository.save(
            Product.create(request.getSku(), request.getName(), request.getUnitPrice())
        );

        return ProductResponse.from(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public void updateProduct(Long productId, UpdateProductBody request) {
        Product findProduct =  productRepository.findById(productId)
                .orElseThrow();

        findProduct.setName(request.getName() != null ? request.getName() : findProduct.getName());
        findProduct.setUnitPrice(request.getUnitPrice());
    }

    public ProductResponse getProduct(Long id) {
        Product findProduct =  productRepository.findById(id).orElseThrow();

        return ProductResponse.from(findProduct);
    }

    public List<ProductResponse> getAllProducts(ReadProductsParams request) {
        return productRepository.findAll()
                .stream().map(ProductResponse::from).toList();
    }

    @Transactional
    public void deleteBulkProduct(DeleteBulkProductBody request) {
        request.getIds().forEach(productRepository::deleteById);
    }
}
