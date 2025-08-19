package db.spring.customer.api.dto.request.read;

import lombok.Data;

@Data
public class ReadCustomerParams {

    private String name;

    private String email;
}
