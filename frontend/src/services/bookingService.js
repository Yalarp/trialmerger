import api from './api';

const createBooking = (bookingData) => {
    return api.post('/bookings/create', bookingData);
};

const getBookingById = (id) => {
    return api.get(`/bookings/${id}`);
};

const getCustomerBookings = (customerId) => {
    return api.get(`/bookings/customer/${customerId}`);
};

const deleteBooking = (id) => {
    return api.delete(`/bookings/${id}`);
};

const bookingService = {
    createBooking,
    getBookingById,
    getCustomerBookings,
    deleteBooking,
};

export default bookingService;
