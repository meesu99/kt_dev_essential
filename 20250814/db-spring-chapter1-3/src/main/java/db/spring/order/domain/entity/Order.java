package db.spring.order.domain.entity;

import db.spring.customer.domain.entity.Customer;
import db.spring.order.domain.enums.PaymentMethod;
import db.spring.order.domain.enums.Status;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders"
        ,schema = "jpa",
        uniqueConstraints = {@UniqueConstraint(name = "uq_orders_order_code", columnNames = "order_code")})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "order_id",  nullable = false, updatable = false,
//            columnDefinition = "bigint GENERATED ALWAYS AS IDENTITY")
    @Column(name = "order_id",  nullable = false, updatable = false)
    private Long id;

    @Column(name = "order_code", nullable = false, columnDefinition = "text")
    private String orderCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "customer_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_orders_customer_id")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Customer customer;

    @Column(name = "ordered_at", nullable = false)
    private Instant orderedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @OneToMany(mappedBy = "order", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();


    public Order(String orderCode, Customer customer, Instant orderedAt, Status status, PaymentMethod paymentMethod) {
        this.orderCode = orderCode;
        this.customer = customer;
        this.orderedAt = orderedAt;
        this.status = status;
        this.paymentMethod = paymentMethod;
    }

    public Order(Customer customer, PaymentMethod paymentMethod) {
        this(UUID.randomUUID().toString(), customer, Instant.now(), Status.PENDING, paymentMethod);
    }

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
}
