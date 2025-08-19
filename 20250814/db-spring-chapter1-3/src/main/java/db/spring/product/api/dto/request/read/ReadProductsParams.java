package db.spring.product.api.dto.request.read;

import lombok.Data;

@Data
public class ReadProductsParams {
    private String sku;

    private String name;

    private int priceLoe;

    private int priceGOe;
}
