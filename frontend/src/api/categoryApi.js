import axios from "axios";

const BASE_URL = "http://localhost:8080/api/categories";

export const getMainCategories = () => {
  return axios.get(BASE_URL);
};

export const handleCategoryClick = (categoryId) => {
  return axios.get(`${BASE_URL}/${categoryId}`);
};
