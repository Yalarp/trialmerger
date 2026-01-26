package com.etour.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.app.dto.CategoryClickResponseDTO;
import com.etour.app.entity.CategoryMaster;
import com.etour.app.repository.CategoryRepository;
import com.etour.app.service.CategoryService;
import com.etour.app.service.TourService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private TourService tourService;
	
	@Override
	public List<CategoryMaster> getMainCategories() {
		return categoryRepository.findAllBySubcategoryIdIsNull();
	}

	@Override
	public CategoryClickResponseDTO handleCategoryClick(String categoryId) {
		CategoryMaster category = categoryRepository
				.findByCategoryId(categoryId)
				.orElseThrow(() -> new RuntimeException("Category not found"));
		
		boolean flag = Boolean.TRUE.equals(category.getFlag()); // flag=1 => leaf => tour details
		
		CategoryClickResponseDTO resp = new CategoryClickResponseDTO();
		
		if (!flag) {
			resp.setResponseType("SUBCATEGORIES");
			resp.setSubcategories(categoryRepository.findAllBySubcategoryId(category.getCategoryId()));
			resp.setTour(null);
			return resp;
		}
		
		resp.setResponseType("TOUR");
		resp.setSubcategories(null);
		resp.setTour(tourService.getTourDetailsByCatmasterId(category.getId()));
		return resp;

	}

}
