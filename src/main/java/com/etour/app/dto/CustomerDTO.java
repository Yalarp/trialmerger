package com.etour.app.dto;

import com.etour.app.entity.CustomerMaster;

/**
 * Data Transfer Object for Customer - excludes sensitive data like password
 */
public class CustomerDTO {
    private Integer id;
    private String name;
    private String email;
    private String mobileNumber;
    private String address;
    private String city;
    private String state;

    // Default constructor
    public CustomerDTO() {
    }

    // Constructor to convert from CustomerMaster entity
    public CustomerDTO(CustomerMaster customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.email = customer.getEmail();
        this.mobileNumber = customer.getMobileNumber();
        this.address = customer.getAddress();
        this.city = customer.getCity();
        this.state = customer.getState();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
