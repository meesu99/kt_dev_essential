package db.spring.order.api.dto.response;

import db.spring.customer.domain.entity.Customer;
import db.spring.order.domain.entity.Order;
import db.spring.order.domain.enums.PaymentMethod;
import db.spring.order.domain.enums.Status;

import java.time.Instant;
import lombok.Data;

@Data
public class OrderListResponse {
    private Long id;

    private String orderCode;

    private Instant orderedAt;

    private Status status;

    private PaymentMethod paymentMethod;

    private CustomerResponseDTO customer;

    public static OrderListResponse from(Order order) {
        OrderListResponse response = new OrderListResponse();

        response.id = order.getId();
        response.orderCode = order.getOrderCode();
        response.orderedAt = order.getOrderedAt();
        response.status = order.getStatus();
        response.paymentMethod = order.getPaymentMethod();
        response.customer = CustomerResponseDTO.from(order.getCustomer());

        return response;
    }

    @Data
    static class CustomerResponseDTO {
        private Long id;
        private String name;
        private String email;

        static CustomerResponseDTO from(Customer customer) {
            CustomerResponseDTO dto = new CustomerResponseDTO();
            dto.id = customer.getId();
            dto.name = customer.getName();
            dto.email = customer.getEmail();
            return dto;
        }
    }
}
