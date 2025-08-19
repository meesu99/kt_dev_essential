package db.spring.customer.api.controller;

import db.spring.customer.api.dto.request.create.CreateCustomerBody;
import db.spring.customer.api.dto.request.read.ReadCustomerParams;
import db.spring.customer.api.dto.request.update.UpdateCustomerBody;
import db.spring.customer.api.dto.response.CustomerResponse;
import db.spring.customer.api.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/api/customers")
    public ResponseEntity<CustomerResponse> createCustomer(@RequestBody CreateCustomerBody request) {

        CustomerResponse response = customerService.createCustomer(request);
        URI uri = URI.create("/api/customers/" + response.getId());
        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping("/api/customers")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers(@ModelAttribute ReadCustomerParams params) {
        System.out.println("params.getName() = " + params.getName());
        System.out.println("params.getEmail() = " + params.getEmail());
        return ResponseEntity.ok(customerService.getAllCustomers(params));
    }

    @GetMapping("/api/customers/{customerId}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable("customerId") Long customerId) {
        return ResponseEntity.ok(customerService.getCustomer(customerId));
    }

    @PutMapping("/api/customers/{customerId}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable("customerId")  Long customerId,
            @RequestBody UpdateCustomerBody request
    ) {
        return ResponseEntity.ok(customerService.updateCustomer(customerId, request));
    }

    @DeleteMapping("/api/customers/{customerId}")
    public ResponseEntity<Boolean> deleteCustomer(
            @PathVariable("customerId") Long customerId
    ) {
        customerService.deleteCustomer(customerId);
        return ResponseEntity.ok(true);
    }
}
