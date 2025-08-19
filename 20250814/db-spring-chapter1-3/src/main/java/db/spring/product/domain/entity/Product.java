package db.spring.product.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Check;

@Entity
@Table(name = "product",
        schema = "jpa",
        uniqueConstraints = {
        @UniqueConstraint(name = "uq_product_sku", columnNames = "sku")
})
@Check(constraints = "unit_price >= 0", name="product_unit_price_check")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sku;

    @Column(name= "\"name\"", nullable = false, columnDefinition = "text")
    @Setter
    private String name;

    @Column(nullable = false)
    @Setter
    private int unitPrice;

    private Product(String sku, String name, int unitPrice) {
        this.sku = sku;
        this.name = name;
        this.unitPrice = unitPrice;
    }

    public static Product create(String sku, String name, int unitPrice) {
        return new Product(sku, name, unitPrice);
    }
}

