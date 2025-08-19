package db.spring.product.api.dto.request.update;

import lombok.Data;

@Data
public class UpdateProductBody {
    private String name;

    private int unitPrice;
}
