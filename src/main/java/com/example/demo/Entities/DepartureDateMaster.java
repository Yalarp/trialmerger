package com.example.demo.Entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "departure_date_master")
public class DepartureDateMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "departure_date_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "catmaster_id", nullable = false)
    private CategoryMaster catmaster;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "number_of_days", nullable = false)
    private Integer numberOfDays;

    @OneToMany(mappedBy = "departureDate")
    private Set<BookingHeader> bookingHeaders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "departureDate")
    private Set<TourMaster> tourMasters = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CategoryMaster getCatmaster() {
        return catmaster;
    }

    public void setCatmaster(CategoryMaster catmaster) {
        this.catmaster = catmaster;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getNumberOfDays() {
        return numberOfDays;
    }

    public void setNumberOfDays(Integer numberOfDays) {
        this.numberOfDays = numberOfDays;
    }

    public Set<BookingHeader> getBookingHeaders() {
        return bookingHeaders;
    }

    public void setBookingHeaders(Set<BookingHeader> bookingHeaders) {
        this.bookingHeaders = bookingHeaders;
    }

    public Set<TourMaster> getTourMasters() {
        return tourMasters;
    }

    public void setTourMasters(Set<TourMaster> tourMasters) {
        this.tourMasters = tourMasters;
    }

}