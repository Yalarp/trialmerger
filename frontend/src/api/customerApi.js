import axios from "axios";

const BASE_URL = "http://localhost:8080/api/customers";

export const registerCustomer = (customerData) => {
  return axios.post(`${BASE_URL}/register`, customerData)
    .then(res => res.data);
};

// Login now goes to AuthController
export const loginCustomer = (loginData) => {
  return axios.post(`http://localhost:8080/api/auth/login`, loginData)
    .then(res => res.data);
};
