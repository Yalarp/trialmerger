import api from './api';

const register = (userData) => {
    return api.post('/customers/register', userData);
};

const login = (credentials) => {
    return api.post('/customers/login', credentials);
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // If JWT is used
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
