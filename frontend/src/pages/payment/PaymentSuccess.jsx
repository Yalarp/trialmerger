import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const txnId = searchParams.get('txnId');

    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <div className="card" style={{ display: 'inline-block' }}>
                <h2 style={{ color: 'green', marginBottom: '20px' }}>Payment Successful!</h2>
                <p>Your booking has been confirmed.</p>
                <p><strong>Booking ID:</strong> {bookingId}</p>
                <p><strong>Transaction ID:</strong> {txnId}</p>

                <div style={{ marginTop: '30px' }}>
                    <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
                    <Link to="/" className="btn" style={{ marginLeft: '10px', background: '#eee', color: '#333' }}>Home</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
