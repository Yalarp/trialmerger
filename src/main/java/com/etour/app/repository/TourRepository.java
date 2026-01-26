package com.etour.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etour.app.entity.TourMaster;

public interface TourRepository extends JpaRepository<TourMaster, Integer> {
	Optional<TourMaster> findFirstByCatmaster_Id(Integer catmasterId);
}
