package db.spring.customer.api.dto.response;

import db.spring.customer.domain.entity.Customer;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CustomerResponse {
    private Long id;
    private String name;
    private String email;

    public static CustomerResponse from(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.id = customer.getId();
        response.name = customer.getName();
        response.email = customer.getEmail();

        return response;
    }
}
