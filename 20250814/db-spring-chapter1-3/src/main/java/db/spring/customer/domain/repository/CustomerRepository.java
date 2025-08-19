package db.spring.customer.domain.repository;

import db.spring.customer.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long>, CustomerRepositoryCustom {
    Optional<Customer> findByEmail(String email);
}
