import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import authService from '../../services/authService';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const user = authService.getCurrentUser();
            if (!user) return;

            // Assuming user object has id or customerId
            const custId = user.id || user.customerId;
            try {
                const response = await bookingService.getCustomerBookings(custId);
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="container"><p>Loading bookings...</p></div>;

    return (
        <div className="container">
            <h2 className="page-title">My Bookings</h2>

            {bookings.length > 0 ? (
                <div className="card-list">
                    {bookings.map(booking => (
                        <div key={booking.bookingId || booking.id} className="card" style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Booking #{booking.bookingId || booking.id}</h3>
                                <span className="tour-duration-badge" style={{ backgroundColor: booking.status === 'CONFIRMED' ? 'green' : 'orange' }}>
                                    {booking.status || 'PENDING'}
                                </span>
                            </div>
                            <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p>Amount: ₹{booking.totalAmount}</p>
                            <Link to={`/booking/${booking.bookingId || booking.id}`} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '5px 10px', marginTop: '10px' }}>View Details</Link>
                        </div>
                    ))}
                </div>
            ) : <p>No bookings found.</p>}
        </div>
    );
};

export default MyBookings;
