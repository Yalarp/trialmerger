import axios from "axios";

const BASE_URL = "http://localhost:8080/api/costs/category";

export const getCostsByCategory = (catmasterId) => {
  return axios.get(`${BASE_URL}/${catmasterId}`);
};
