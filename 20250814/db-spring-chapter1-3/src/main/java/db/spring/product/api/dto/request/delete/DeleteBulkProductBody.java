package db.spring.product.api.dto.request.delete;

import lombok.Data;

import java.util.List;

@Data
public class DeleteBulkProductBody {
    private List<Long> ids;
}
