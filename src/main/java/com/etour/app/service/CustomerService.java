package com.etour.app.service;

import java.util.List;

import com.etour.app.entity.CustomerMaster;

public interface CustomerService {
	CustomerMaster registerCustomer(CustomerMaster customer);
    List<CustomerMaster> getAllCustomers();
    CustomerMaster getCustomerById(Integer id);
    CustomerMaster updateCustomer(Integer id, CustomerMaster customer);
    void deleteCustomer(Integer id);
    CustomerMaster loginCustomer(String email, String password);
}
