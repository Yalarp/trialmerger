import axios from "axios";

const BASE_URL = "http://localhost:8080/api/search";

export const searchByPeriod = (from, to) => {
    return axios.get(`${BASE_URL}/period`, {
        params: { from, to }
    });
};

export const searchByDuration = (min, max) => {
    return axios.get(`${BASE_URL}/duration`, {
        params: { min, max }
    });
};

export const searchByCost = (min, max) => {
    return axios.get(`${BASE_URL}/cost`, {
        params: { min, max }
    });
};
