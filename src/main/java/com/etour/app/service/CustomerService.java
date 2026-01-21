package com.etour.app.service;

import com.etour.app.entity.CustomerMaster;
import java.util.List;

public interface CustomerService {
    CustomerMaster registerCustomer(CustomerMaster customer);
    List<CustomerMaster> getAllCustomers();
    CustomerMaster getCustomerById(Integer id);
    CustomerMaster updateCustomer(Integer id, CustomerMaster customer);
    void deleteCustomer(Integer id);
    CustomerMaster loginCustomer(String email, String password);
}