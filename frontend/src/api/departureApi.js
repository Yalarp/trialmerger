import axios from "axios";

const BASE_URL = "http://localhost:8080/api/departures/category";

export const getDepartureDatesByCategory = (catmasterId) => {
  return axios.get(`${BASE_URL}/${catmasterId}`);
};
