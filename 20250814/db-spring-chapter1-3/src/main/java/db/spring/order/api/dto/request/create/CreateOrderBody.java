package db.spring.order.api.dto.request.create;

import db.spring.order.domain.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderBody {
    private Long customerId;

    private PaymentMethod paymentMethod;

    private List<CreateOrderItem> orderItems;

    @Data
    public static class CreateOrderItem {
        private Long productId;
        private Integer quantity;
    }
}
