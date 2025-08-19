package db.spring.product.api.dto.request.create;

import lombok.Data;

@Data
public class CreateProductBody {
    private String sku;
    private String name;
    private int unitPrice;
}
