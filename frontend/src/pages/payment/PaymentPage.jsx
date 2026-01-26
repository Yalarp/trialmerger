import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import paymentService from '../../services/paymentService'; // You need to implement this one

const PaymentPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const bookingId = searchParams.get('bookingId');

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await bookingService.getBookingById(bookingId);
                setBooking(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                alert("Failed to load booking details.");
                setLoading(false);
            }
        };
        if (bookingId) fetchBooking();
    }, [bookingId]);

    const handlePayment = async () => {
        setProcessing(true);
        try {
            // Construct Payment Data
            const paymentData = {
                bookingId: parseInt(bookingId),
                amount: booking.totalAmount || 10000, // Fallback if 0
                paymentMethod: paymentMethod,
                transactionId: 'TXN' + Date.now(),
                paymentDate: new Date().toISOString(),
                status: 'SUCCESS'
            };

            await paymentService.processPayment(paymentData);

            navigate(`/payment-success?bookingId=${bookingId}&txnId=${paymentData.transactionId}`);
        } catch (err) {
            console.error(err);
            alert("Payment failed.");
            setProcessing(false);
        }
    };

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container">
            <h2 className="page-title">Payment</h2>
            <div className="card">
                <p>Booking ID: <strong>{bookingId}</strong></p>
                <p>Total Amount: <strong>₹{booking?.totalAmount || 'Calculated at Backend'}</strong></p>

                <div className="form-group">
                    <label>Select Payment Method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Net Banking">Net Banking</option>
                    </select>
                </div>

                <button onClick={handlePayment} className="btn btn-primary" disabled={processing}>
                    {processing ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
