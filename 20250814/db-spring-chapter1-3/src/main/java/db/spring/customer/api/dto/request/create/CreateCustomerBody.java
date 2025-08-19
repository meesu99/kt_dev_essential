package db.spring.customer.api.dto.request.create;

import lombok.Data;

@Data
public class CreateCustomerBody {
    private String name;
    private String email;
}
