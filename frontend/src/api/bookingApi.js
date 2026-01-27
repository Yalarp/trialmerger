import axiosInstance from "./axiosInstance";

export const getAllBookings = () => {
  return axiosInstance.get("/api/bookings").then(res => res.data);
};

export const getBookingById = (id) => {
  return axiosInstance.get(`/api/bookings/${id}`).then(res => res.data);
};

export const getBookingsByCustomer = (customerId) => {
  return axiosInstance.get(`/api/bookings/customer/${customerId}`).then(res => res.data);
};

export const createBooking = (bookingData) => {
  return axiosInstance.post("/api/bookings/create", bookingData).then(res => res.data);
};

export const updateBooking = (id, bookingData) => {
  return axiosInstance.put(`/api/bookings/${id}`, bookingData).then(res => res.data);
};

export const deleteBooking = (id) => {
  return axiosInstance.delete(`/api/bookings/${id}`).then(res => res.data);
};

// ========== PAYMENT ENDPOINTS ==========

export const createRazorpayOrder = (bookingId, amount) => {
  return axiosInstance.post(`/api/razorpay/create-order`, {
    bookingId: bookingId,
    amount: amount,
  }).then(res => res.data);
};

export const verifyPayment = (paymentData) => {
  return axiosInstance.post(`/api/razorpay/verify-payment`, {
    bookingId: paymentData.bookingId,
    razorpayOrderId: paymentData.razorpay_order_id,
    razorpayPaymentId: paymentData.razorpay_payment_id,
    razorpaySignature: paymentData.razorpay_signature,
  }).then(res => res.data);
};

// ========== INVOICE ENDPOINTS ==========

export const downloadInvoice = (bookingId) => {
  return axiosInstance.get(`/api/invoices/${bookingId}/download`, {
    responseType: "blob",
  });
};

export const resendInvoiceEmail = (bookingId) => {
  return axiosInstance.post(`/api/invoices/${bookingId}/resend-email`).then(res => res.data);
};
