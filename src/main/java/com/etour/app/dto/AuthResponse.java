package com.etour.app.dto;

public class AuthResponse {
    private String token;
    private Integer customerId;
    private String name;

    public AuthResponse() {
    }

    public AuthResponse(String token, Integer customerId, String name) {
        this.token = token;
        this.customerId = customerId;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
