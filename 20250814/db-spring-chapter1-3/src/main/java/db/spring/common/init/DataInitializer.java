package db.spring.common.init;

import db.spring.customer.domain.entity.Customer;
import db.spring.customer.domain.repository.CustomerRepository;
import db.spring.order.domain.entity.Order;
import db.spring.order.domain.entity.OrderItem;
import db.spring.order.domain.enums.PaymentMethod;
import db.spring.order.domain.enums.Status;
import db.spring.order.domain.repository.OrderItemRepository;
import db.spring.order.domain.repository.OrderRepository;
import db.spring.product.domain.entity.Product;
import db.spring.product.domain.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @PostConstruct
    @Transactional
    public void init() {
        // 이미 한번 넣었다면 재삽입 방지 (간단 기준)
        if (customerRepository.count() > 0L || productRepository.count() > 0L || orderRepository.count() > 0L) {
            return;
        }

        seedCustomers();
        seedProducts();
        seedOrdersAndItems();
    }

    private void seedCustomers() {
        customerRepository.save(new Customer("김하늘", "sky@example.com"));
        customerRepository.save(new Customer("박지민", "jimin@example.com"));
        customerRepository.save(new Customer("최유나", "yuna@example.com"));
        customerRepository.save(new Customer("오민호", "mino@example.com"));
        customerRepository.save(new Customer("이서준", "seojun@example.com"));
        customerRepository.save(new Customer("정한나", "hanna@example.com"));
    }

    private void seedProducts() {
        productRepository.save(Product.create("SKU-100", "아메리카노", 3500));
        productRepository.save(Product.create("SKU-200", "라떼",       4500));
        productRepository.save(Product.create("SKU-300", "카푸치노",   4300));
        productRepository.save(Product.create("SKU-400", "바닐라라떼", 4800));
        productRepository.save(Product.create("SKU-500", "콜드브루",   5000));
        productRepository.save(Product.create("SKU-600", "레몬티",     3200));
    }

    private void seedOrdersAndItems() {
        // 주문(14건, 2025-08-01 ~ 2025-08-12) — SQL과 동일한 데이터
        createOrder("O-20250801-001", "sky@example.com",   kstInstant(2025,8,1, 9,15),  Status.PAID,      PaymentMethod.CARD);
        createOrder("O-20250801-002", "jimin@example.com", kstInstant(2025,8,1,12,40),  Status.CANCELED, PaymentMethod.CARD);
        createOrder("O-20250802-001", "yuna@example.com",  kstInstant(2025,8,2,14,5),   Status.PAID,      PaymentMethod.CASH);
        createOrder("O-20250803-001", "sky@example.com",   kstInstant(2025,8,3,10,22),  Status.SHIPPED,   PaymentMethod.CARD);
        createOrder("O-20250803-002", "mino@example.com",  kstInstant(2025,8,3,16,7),   Status.PENDING,   PaymentMethod.CARD);
        createOrder("O-20250804-001", "sky@example.com",   kstInstant(2025,8,4, 8,50),  Status.PAID,      PaymentMethod.POINT);
        createOrder("O-20250805-001", "seojun@example.com",kstInstant(2025,8,5,19,30),  Status.PAID,      PaymentMethod.CARD);
        createOrder("O-20250806-001", "jimin@example.com", kstInstant(2025,8,6,11,5),   Status.PAID,      PaymentMethod.CASH);
        createOrder("O-20250808-001", "hanna@example.com", kstInstant(2025,8,8,13,53),  Status.PAID,      PaymentMethod.CARD);
        createOrder("O-20250809-001", "yuna@example.com",  kstInstant(2025,8,9,18,10),  Status.CANCELED, PaymentMethod.CARD);
        createOrder("O-20250810-001", "mino@example.com",  kstInstant(2025,8,10,10,10), Status.PAID,      PaymentMethod.CASH);
        createOrder("O-20250810-002", "sky@example.com",   kstInstant(2025,8,10,21,5),  Status.PAID,      PaymentMethod.CARD);
        createOrder("O-20250811-001", "jimin@example.com", kstInstant(2025,8,11,9,25),  Status.SHIPPED,   PaymentMethod.CARD);
        createOrder("O-20250812-001", "sky@example.com",   kstInstant(2025,8,12,8,15),  Status.PAID,      PaymentMethod.CASH);

        // 품목 — SQL과 동일한 수량/상품/단가 구성
        // 1
        addItem("O-20250801-001", "SKU-100", 2);
        addItem("O-20250801-001", "SKU-200", 1);
        // 2 (CANCELLED)
        addItem("O-20250801-002", "SKU-500", 1);
        // 3
        addItem("O-20250802-001", "SKU-400", 1);
        addItem("O-20250802-001", "SKU-600", 1);
        // 4 (SHIPPED)
        addItem("O-20250803-001", "SKU-100", 1);
        addItem("O-20250803-001", "SKU-300", 1);
        // 5 (PENDING)
        addItem("O-20250803-002", "SKU-600", 2);
        // 6
        addItem("O-20250804-001", "SKU-200", 3);
        // 7
        addItem("O-20250805-001", "SKU-100", 1);
        addItem("O-20250805-001", "SKU-500", 2);
        // 8
        addItem("O-20250806-001", "SKU-300", 1);
        addItem("O-20250806-001", "SKU-200", 1);
        // 9
        addItem("O-20250808-001", "SKU-400", 2);
        // 10 (CANCELLED)
        addItem("O-20250809-001", "SKU-100", 1);
        addItem("O-20250809-001", "SKU-600", 1);
        // 11
        addItem("O-20250810-001", "SKU-100", 3);
        // 12
        addItem("O-20250810-002", "SKU-500", 1);
        addItem("O-20250810-002", "SKU-300", 1);
        addItem("O-20250810-002", "SKU-200", 1);
        // 13 (SHIPPED)
        addItem("O-20250811-001", "SKU-100", 2);
        addItem("O-20250811-001", "SKU-500", 1);
        // 14
        addItem("O-20250812-001", "SKU-200", 1);
        addItem("O-20250812-001", "SKU-400", 1);
    }

    private void createOrder(String orderCode, String customerEmail, Instant orderedAt,
                             Status status, PaymentMethod pm) {
        var customer = customerRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new IllegalStateException("Customer not found: " + customerEmail));
        Order order = new Order(orderCode, customer, orderedAt, status, pm);
        orderRepository.save(order);
    }

    private void addItem(String orderCode, String sku, int quantity) {
        var order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new IllegalStateException("Order not found: " + orderCode));
        var product = productRepository.findBySku(sku)
                .orElseThrow(() -> new IllegalStateException("Product not found: " + sku));

        OrderItem item = new OrderItem(order, product, quantity, product.getUnitPrice());
        orderItemRepository.save(item);
    }

    /** "2025-08-01 09:15+09" 같은 SQL 표기와 동일한 KST 시각을 Instant로 */
    private Instant kstInstant(int year, int month, int day, int hour, int minute) {
        ZonedDateTime zdt = ZonedDateTime.of(
                LocalDateTime.of(year, month, day, hour, minute),
                ZoneId.of("Asia/Seoul")
        );
        return zdt.toInstant();
    }
}
