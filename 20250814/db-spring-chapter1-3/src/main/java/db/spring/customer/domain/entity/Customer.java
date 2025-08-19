package db.spring.customer.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customer"
        , schema = "jpa"
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long id;

    @Setter
    private String name;

    @Column(unique = true)
    @Setter
    private String email;

    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
