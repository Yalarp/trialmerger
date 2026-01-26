import api from './api';

const processPayment = (paymentData) => {
    return api.post('/payments', paymentData);
};

const getPaymentByBookingId = (bookingId) => {
    return api.get(`/payments/booking/${bookingId}`);
}

const paymentService = {
    processPayment,
    getPaymentByBookingId
};

export default paymentService;
