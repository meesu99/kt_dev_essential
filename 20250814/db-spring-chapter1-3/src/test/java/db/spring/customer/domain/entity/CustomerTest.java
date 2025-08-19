package db.spring.customer.domain.entity;

import db.spring.customer.domain.repository.CustomerRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class CustomerTest {
    @PersistenceContext
    EntityManager em;

    @Test
    public void testEntity() {
        Customer customer1 = new Customer("test1", "test1@test.com");
        Customer customer2 = new Customer("test2", "test2@test.com");
        Customer customer3 = new Customer("test3", "test3@test.com");
        Customer customer4 = new Customer("test4", "test4@test.com");


        em.persist(customer1);
        em.persist(customer2);
        em.persist(customer3);
        em.persist(customer4);

        em.flush();
        em.clear();

        List<Customer> customers = em.createQuery("SELECT c FROM Customer c", Customer.class)
                .getResultList();

        for (Customer customer : customers) {
            System.out.println("customer = " + customer);
            System.out.println("customer.getEmail() = " + customer.getEmail());
            System.out.println("customer.getName() = " + customer.getName());
        }
    }

}