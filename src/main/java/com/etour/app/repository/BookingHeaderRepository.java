package com.etour.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.etour.app.entity.BookingHeader;

public interface BookingHeaderRepository 
extends JpaRepository<BookingHeader, Integer> {
	 @Query(value = "SELECT * FROM booking_header WHERE customer_id = :customerId", nativeQuery = true)
	    List<BookingHeader> getBookingsByCustomerId(@Param("customerId") Integer customerId);
}

