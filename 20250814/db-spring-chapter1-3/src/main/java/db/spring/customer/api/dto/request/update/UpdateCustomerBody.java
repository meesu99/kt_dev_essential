package db.spring.customer.api.dto.request.update;

import lombok.Data;

@Data
public class UpdateCustomerBody {
    private String name;
    private String email;
}
