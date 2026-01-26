package com.etour.app.service.impl;

import com.etour.app.entity.CustomerMaster;
import com.etour.app.repository.CustomerRepository;
import com.etour.app.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public CustomerMaster registerCustomer(CustomerMaster customer) {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email already registered: " + customer.getEmail());
        }
        // Hash the password before saving
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }
    
    @Override
    public List<CustomerMaster> getAllCustomers() {
        return customerRepository.findAll();
    }
    
    @Override
    public CustomerMaster getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));
    }
    
    @Override
    @Transactional
    public CustomerMaster updateCustomer(Integer id, CustomerMaster customerDetails) {
        CustomerMaster existingCustomer = getCustomerById(id);
        
        existingCustomer.setName(customerDetails.getName());
        existingCustomer.setMobileNumber(customerDetails.getMobileNumber());
        existingCustomer.setAddress(customerDetails.getAddress());
        existingCustomer.setCity(customerDetails.getCity());
        existingCustomer.setState(customerDetails.getState());
        
        // Hash the new password if provided
        if (customerDetails.getPassword() != null && !customerDetails.getPassword().isEmpty()) {
            existingCustomer.setPassword(passwordEncoder.encode(customerDetails.getPassword()));
        }
        return customerRepository.save(existingCustomer);
    }
    
    @Override
    @Transactional
    public void deleteCustomer(Integer id) {
        CustomerMaster customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));
        
        customerRepository.delete(customer);
    }
    
    @Override
    public CustomerMaster loginCustomer(String email, String password) {
        Optional<CustomerMaster> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isPresent()) {
            CustomerMaster customer = customerOpt.get();
            // Fix NPE: Check if stored password is not null and matches using BCrypt
            if (customer.getPassword() != null && passwordEncoder.matches(password, customer.getPassword())) {
                return customer;
            }
        }
        return null;
    }
}