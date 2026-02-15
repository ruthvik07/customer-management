package com.customermanagement.backend.service;

import com.customermanagement.backend.dto.CustomerRequestDto;
import com.customermanagement.backend.dto.CustomerResponseDto;
import com.customermanagement.backend.entity.Customer;
import com.customermanagement.backend.exception.UnknownCustomerException;
import com.customermanagement.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    // Get all customers
    public List<CustomerResponseDto> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .toList();
    }

    // Get one customer
    public CustomerResponseDto getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new UnknownCustomerException("Customer not found with id: " + id));
        return convertToResponseDto(customer);
    }

    // Create a customer
    public CustomerResponseDto createCustomer(CustomerRequestDto customerRequestDto) {
        Customer customer = new Customer(
                customerRequestDto.firstName(),
                customerRequestDto.lastName(),
                customerRequestDto.email(),
                customerRequestDto.phone()
        );
        Customer savedCustomer = customerRepository.save(customer);
        return convertToResponseDto(savedCustomer); 
    }

    // Update a customer
    public CustomerResponseDto updateCustomer(Long id, CustomerRequestDto customerRequestDto) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new UnknownCustomerException("Customer not found with id: " + id));
        existing.setFirstName(customerRequestDto.firstName());
        existing.setLastName(customerRequestDto.lastName());
        existing.setEmail(customerRequestDto.email());
        existing.setPhone(customerRequestDto.phone());
        Customer updatedCustomer = customerRepository.save(existing);
        return convertToResponseDto(updatedCustomer);
    }

    // Delete a customer
    public void deleteCustomer(Long id) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new UnknownCustomerException("Customer not found with id: " + id));
        customerRepository.delete(existing);
    }

    // Helper method to convert Customer to CustomerResponseDto
    private CustomerResponseDto convertToResponseDto(Customer customer) {
        return new CustomerResponseDto(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhone()
        ); 
    }
}
