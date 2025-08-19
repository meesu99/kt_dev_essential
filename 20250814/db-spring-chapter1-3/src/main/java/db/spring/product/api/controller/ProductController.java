package db.spring.product.api.controller;

import db.spring.product.api.dto.request.create.CreateProductBody;
import db.spring.product.api.dto.request.delete.DeleteBulkProductBody;
import db.spring.product.api.dto.request.read.ReadProductsParams;
import db.spring.product.api.dto.request.update.UpdateProductBody;
import db.spring.product.api.dto.response.ProductResponse;
import db.spring.product.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping("/api/products")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody CreateProductBody request) {
        ProductResponse response = productService.createProduct(request);
        URI location = URI.create("/api/products" + response.getId());

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/api/products")
    public ResponseEntity<List<ProductResponse>> getProducts(@ModelAttribute ReadProductsParams request) {
        return ResponseEntity.ok(productService.getAllProducts(request));
    }

    @GetMapping("/api/products/{productId}")
    public ResponseEntity<ProductResponse> getProduct(
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(productService.getProduct(productId));
    }

    @PutMapping("/api/products/{productId}")
    public ResponseEntity<Boolean> updateProduct(
            @PathVariable("productId") Long productId,
            @RequestBody UpdateProductBody request
    ) {
        productService.updateProduct(productId, request);

        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/api/products/{productId}")
    public ResponseEntity<Boolean> deleteProduct(
            @PathVariable Long productId
    ) {
        productService.deleteProduct(productId);

        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/api/products")
    public ResponseEntity<Boolean> deleteAllProducts(
            @RequestBody DeleteBulkProductBody request
            ) {

        productService.deleteBulkProduct(request);
        return ResponseEntity.ok(true);
    }
}
