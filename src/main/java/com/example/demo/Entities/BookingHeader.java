package com.example.demo.Entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "booking_header")
public class BookingHeader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id", nullable = false)
    private Integer id;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerMaster customer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tour_id", nullable = false)
    private TourMaster tour;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "departure_date_id", nullable = false)
    private DepartureDateMaster departureDate;

    @Column(name = "total_passengers", nullable = false)
    private Integer totalPassengers;

    @Column(name = "tour_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal tourAmount;

    @Column(name = "tax_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal taxAmount;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "booking")
    private Set<BookingAddonMaster> bookingAddonMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "booking")
    private Set<PassengerMaster> passengerMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "booking")
    private Set<Payment> payments = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public CustomerMaster getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerMaster customer) {
        this.customer = customer;
    }

    public TourMaster getTour() {
        return tour;
    }

    public void setTour(TourMaster tour) {
        this.tour = tour;
    }

    public DepartureDateMaster getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(DepartureDateMaster departureDate) {
        this.departureDate = departureDate;
    }

    public Integer getTotalPassengers() {
        return totalPassengers;
    }

    public void setTotalPassengers(Integer totalPassengers) {
        this.totalPassengers = totalPassengers;
    }

    public BigDecimal getTourAmount() {
        return tourAmount;
    }

    public void setTourAmount(BigDecimal tourAmount) {
        this.tourAmount = tourAmount;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Set<BookingAddonMaster> getBookingAddonMasters() {
        return bookingAddonMasters;
    }

    public void setBookingAddonMasters(Set<BookingAddonMaster> bookingAddonMasters) {
        this.bookingAddonMasters = bookingAddonMasters;
    }

    public Set<PassengerMaster> getPassengerMasters() {
        return passengerMasters;
    }

    public void setPassengerMasters(Set<PassengerMaster> passengerMasters) {
        this.passengerMasters = passengerMasters;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

}