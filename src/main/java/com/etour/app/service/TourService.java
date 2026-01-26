package com.etour.app.service;

import java.util.List;

import com.etour.app.dto.TourDTO;
import com.etour.app.entity.TourMaster;

public interface TourService 
{
    List<TourMaster> getAllTours();
    TourMaster getTourById(int id);
    TourMaster addTour(TourMaster tourMaster);
    void deleteTour(int id);
    TourDTO getTourDetailsByCatmasterId(int catmasterId);

}
