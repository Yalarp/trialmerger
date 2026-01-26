package com.etour.app.repository;

import com.etour.app.entity.CategoryMaster;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryMaster, Integer> {
	// Fetch main categories
	List<CategoryMaster> findAllBySubcategoryIdIsNull();
	
	Optional<CategoryMaster> findByCategoryId(String categoryId);
	
	boolean existsBySubcategoryId(String categoryId);

	
	// Fetch all Subcategories of a Category
	List<CategoryMaster> findAllBySubcategoryId(String categoryId);
}
