package com.example.demo.Entities;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "tour_master")
public class TourMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tour_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "catmaster_id", nullable = false)
    private CategoryMaster catmaster;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "departure_date_id", nullable = false)
    private DepartureDateMaster departureDate;

    @Column(name = "description", length = 500)
    private String description;

    @OneToMany(mappedBy = "tour")
    private Set<BookingHeader> bookingHeaders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "tour")
    private Set<TourAddonMaster> tourAddonMasters = new LinkedHashSet<>();

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

    public DepartureDateMaster getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(DepartureDateMaster departureDate) {
        this.departureDate = departureDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<BookingHeader> getBookingHeaders() {
        return bookingHeaders;
    }

    public void setBookingHeaders(Set<BookingHeader> bookingHeaders) {
        this.bookingHeaders = bookingHeaders;
    }

    public Set<TourAddonMaster> getTourAddonMasters() {
        return tourAddonMasters;
    }

    public void setTourAddonMasters(Set<TourAddonMaster> tourAddonMasters) {
        this.tourAddonMasters = tourAddonMasters;
    }

}