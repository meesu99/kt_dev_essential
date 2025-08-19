package db.spring.order.api.controller;

import db.spring.order.api.dto.request.create.CreateOrderBody;
import db.spring.order.api.dto.response.OrderListResponse;
import db.spring.order.api.dto.response.OrderResponse;
import db.spring.order.api.service.OrderService;
import db.spring.order.domain.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/api/orders")
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody CreateOrderBody request
            ) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @GetMapping("/api/orders")
    public ResponseEntity<List<OrderListResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getOrderList());
    }

    @GetMapping("/api/orders/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable("orderId") Long orderId) {
        return ResponseEntity.ok(orderService.getOrder(orderId));
    }

    @DeleteMapping("/api/orders/{orderid}")
    public ResponseEntity<Boolean> deletOrderById(@PathVariable("orderid") Long orderId) {
        orderService.deleteOrder(orderId);

        return ResponseEntity.ok(true);
    }
}
