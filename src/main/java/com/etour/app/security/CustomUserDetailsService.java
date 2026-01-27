package com.etour.app.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.etour.app.entity.CustomerMaster;
import com.etour.app.repository.CustomerRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomerMaster customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Assuming no roles for now, or you can add them here
        return new org.springframework.security.core.userdetails.User(
                customer.getEmail(),
                customer.getPassword(),
                new ArrayList<>());
    }
}
