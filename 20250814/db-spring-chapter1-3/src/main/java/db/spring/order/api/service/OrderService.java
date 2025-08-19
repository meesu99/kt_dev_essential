package db.spring.order.api.service;

import db.spring.customer.domain.entity.Customer;
import db.spring.customer.domain.repository.CustomerRepository;
import db.spring.order.api.dto.request.create.CreateOrderBody;
import db.spring.order.api.dto.response.OrderListResponse;
import db.spring.order.api.dto.response.OrderResponse;
import db.spring.order.domain.entity.Order;
import db.spring.order.domain.entity.OrderItem;
import db.spring.order.domain.repository.OrderRepository;
import db.spring.product.domain.entity.Product;
import db.spring.product.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;


    @Transactional
    public OrderResponse createOrder(CreateOrderBody request) {
        Customer findCustomer = customerRepository.findById(request.getCustomerId()).orElseThrow();
        Order order =  new Order(findCustomer, request.getPaymentMethod());
        request.getOrderItems().forEach(
                oi -> {
                    Product product = productRepository.findById(oi.getProductId()).orElseThrow();
                    OrderItem orderItem = new OrderItem(
                            order,
                            product,
                            oi.getQuantity(),
                            product.getUnitPrice()
                    );

                    order.addOrderItem(orderItem);
                }
        );

        Order savedOrder = orderRepository.save(order);

        return OrderResponse.from(savedOrder);
    }

    public List<OrderListResponse> getOrderList() {
        return orderRepository.findAll().stream()
                .map(OrderListResponse::from)
                .toList();
    }

    public OrderResponse getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        return OrderResponse.from(order);
    }

    @Transactional
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
