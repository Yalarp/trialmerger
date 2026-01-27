import axios from "axios";

const BASE_URL = "http://localhost:8080/api/itineraries/category";

export const getItineraryByCategory = (catmasterId) => {
  return axios.get(`${BASE_URL}/${catmasterId}`);
};
