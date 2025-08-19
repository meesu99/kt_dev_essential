package db.spring.order.api.dto.response;

import db.spring.customer.api.dto.response.CustomerResponse;
import db.spring.customer.domain.entity.Customer;
import db.spring.order.domain.entity.Order;
import db.spring.order.domain.entity.OrderItem;
import db.spring.order.domain.enums.PaymentMethod;
import db.spring.order.domain.enums.Status;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponse {

    private Long id;

    private String orderCode;

    private Instant orderedAt;

    private Status status;

    private PaymentMethod paymentMethod;

    private CustomerResponseDTO customer;

    private List<OrderItemResponseDTO> orderItems;


    public static OrderResponse from(Order order) {
        OrderResponse response = new OrderResponse();

        response.id = order.getId();
        response.orderCode = order.getOrderCode();
        response.orderedAt = order.getOrderedAt();
        response.status = order.getStatus();
        response.paymentMethod = order.getPaymentMethod();
        response.customer =  CustomerResponseDTO.from(order.getCustomer());
        response.orderItems = order.getOrderItems().stream()
                .map(OrderItemResponseDTO::from)
                .collect(Collectors.toList());

        
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

    @Data
    static class OrderItemResponseDTO {
        private Long id;
        private String itemCode;
        private String itemName;

        static OrderItemResponseDTO from(OrderItem orderItem) {
            OrderItemResponseDTO dto = new OrderItemResponseDTO();
            dto.id = orderItem.getId();
            dto.itemCode = orderItem.getProduct().getSku();
            dto.itemName = orderItem.getProduct().getName();

            return dto;
        }
    }
}
