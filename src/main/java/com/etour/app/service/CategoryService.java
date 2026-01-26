package com.etour.app.service;

import java.util.List;

import com.etour.app.dto.CategoryClickResponseDTO;
import com.etour.app.entity.CategoryMaster;

public interface CategoryService {
	List<CategoryMaster> getMainCategories();
	
	CategoryClickResponseDTO handleCategoryClick(String categoryId);
}
