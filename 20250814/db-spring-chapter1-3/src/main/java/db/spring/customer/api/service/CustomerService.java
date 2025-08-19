package db.spring.customer.api.service;

import db.spring.customer.api.dto.request.create.CreateCustomerBody;
import db.spring.customer.api.dto.request.read.ReadCustomerParams;
import db.spring.customer.api.dto.request.update.UpdateCustomerBody;
import db.spring.customer.api.dto.response.CustomerResponse;
import db.spring.customer.domain.entity.Customer;
import db.spring.customer.domain.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional
    public CustomerResponse createCustomer(CreateCustomerBody request) {
        Customer customer = new Customer(request.getName(), request.getEmail());

        Customer savedCustomer = customerRepository.save(customer);
        return CustomerResponse.from(savedCustomer);
    }

    @Transactional
    public CustomerResponse updateCustomer(Long customerId,  UpdateCustomerBody request) {
        Customer findCustomer = customerRepository.findById(customerId).orElseThrow();

        findCustomer.setName(request.getName() != null ? request.getName() : findCustomer.getName());
        findCustomer.setEmail(request.getEmail() != null ? request.getEmail() : findCustomer.getEmail());

        return CustomerResponse.from(findCustomer);
    }

    @Transactional
    public void deleteCustomer(Long customerId) {
        customerRepository.deleteById(customerId);
    }

    public CustomerResponse getCustomer(Long customerId) {
        Customer findCustomer = customerRepository.findById(customerId).orElseThrow();
        return CustomerResponse.from(findCustomer);
    }

    public List<CustomerResponse> getAllCustomers(ReadCustomerParams params) {
        List<Customer> customers = customerRepository.findAll();

        return customers.stream().map(CustomerResponse::from).toList();
    }

}
