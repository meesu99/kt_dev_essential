package db.spring.customer.api.dto.request.delete;

import lombok.Data;

import java.util.List;

@Data
public class DeleteBulkCustomerBody {
    private List<Long> ids;
}
