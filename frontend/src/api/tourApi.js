import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tours/details";

export const getTourDetails = (catmasterId) => {
  return axios.get(`${BASE_URL}/${catmasterId}`);
};
