import axios from "axios";

const BASE_URL = "http://localhost:8080/api/passengers";

export const addPassenger = (passenger) =>
  axios.post(`${BASE_URL}/add`, passenger);

export const getPassengersByBooking = (bookingId) =>
  axios.get(`${BASE_URL}/booking/${bookingId}`);
