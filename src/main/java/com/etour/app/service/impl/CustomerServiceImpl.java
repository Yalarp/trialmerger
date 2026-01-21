package com.etour.app.service.impl;

import com.etour.app.entity.CustomerMaster;
import com.etour.app.repository.CustomerRepository;
import com.etour.app.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Override
    public CustomerMaster registerCustomer(CustomerMaster customer) {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email already registered: " + customer.getEmail());
        }
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
        
        if (customerDetails.getPassword() != null && !customerDetails.getPassword().isEmpty()) {
            existingCustomer.setPassword(customerDetails.getPassword());
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
            if (customer.getPassword().equals(password)) {
                return customer;
            }
        }
        return null;
    }
}