import api from './api';

const getAllCategories = () => {
    return api.get('/categories');
};

const getCategoryById = (id) => {
    return api.get(`/categories/${id}`);
};

const getSubCategories = (id) => {
    // Assuming a convention, or maybe it's just fetching the category which contains subcats
    // Or maybe there is a specific endpoint. User didn't specify one for subcats specifically, 
    // just "GET /api/categories/{categoryId}" for SubCategory page.
    // So likely the category response includes subcategories.
    return api.get(`/categories/${id}`);
};

const categoryService = {
    getAllCategories,
    getCategoryById,
    getSubCategories,
};

export default categoryService;
