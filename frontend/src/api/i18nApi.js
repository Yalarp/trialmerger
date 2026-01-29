import axios from "axios";

const BASE_URL = "http://localhost:8080/api/i18n";

export const getSupportedLanguages = () => {
    return axios.get(`${BASE_URL}/languages`);
};

export const getTranslations = (locale) => {
    return axios.get(`${BASE_URL}/${locale}`);
};
