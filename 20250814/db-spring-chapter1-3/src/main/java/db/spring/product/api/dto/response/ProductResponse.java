package db.spring.product.api.dto.response;

import db.spring.product.domain.entity.Product;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ProductResponse {
    private Long id;
    private String sku;
    private String name;
    private int unitPrice;

    public static ProductResponse from(Product product) {
        ProductResponse response = new ProductResponse();

        response.id = product.getId();
        response.name = product.getName();
        response.sku = product.getSku();
        response.unitPrice = product.getUnitPrice();

        return response;
    }
}
