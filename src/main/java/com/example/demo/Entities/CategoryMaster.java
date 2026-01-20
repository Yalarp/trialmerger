package com.example.demo.Entities;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "category_master")
public class CategoryMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "catmaster_id", nullable = false)
    private Integer id;

    @Column(name = "category_id", nullable = false, length = 10)
    private String categoryId;

    @Column(name = "subcategory_id", length = 10)
    private String subcategoryId;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "flag", nullable = false)
    private Boolean flag;

    @OneToMany(mappedBy = "catmaster")
    private Set<CostMaster> costMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "catmaster")
    private Set<DepartureDateMaster> departureDateMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "catmaster")
    private Set<ItineraryMaster> itineraryMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "catmaster")
    private Set<TourMaster> tourMasters = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(String subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Boolean getFlag() {
        return flag;
    }

    public void setFlag(Boolean flag) {
        this.flag = flag;
    }

    public Set<CostMaster> getCostMasters() {
        return costMasters;
    }

    public void setCostMasters(Set<CostMaster> costMasters) {
        this.costMasters = costMasters;
    }

    public Set<DepartureDateMaster> getDepartureDateMasters() {
        return departureDateMasters;
    }

    public void setDepartureDateMasters(Set<DepartureDateMaster> departureDateMasters) {
        this.departureDateMasters = departureDateMasters;
    }

    public Set<ItineraryMaster> getItineraryMasters() {
        return itineraryMasters;
    }

    public void setItineraryMasters(Set<ItineraryMaster> itineraryMasters) {
        this.itineraryMasters = itineraryMasters;
    }

    public Set<TourMaster> getTourMasters() {
        return tourMasters;
    }

    public void setTourMasters(Set<TourMaster> tourMasters) {
        this.tourMasters = tourMasters;
    }

}