import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import paymentService from '../../services/paymentService';

const BookingDetails = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await bookingService.getBookingById(id);
                setBooking(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id]);

    if (loading) return <div className="container"><p>Loading...</p></div>;
    if (!booking) return <div className="container"><p>Booking not found.</p></div>;

    return (
        <div className="container">
            <h2 className="page-title">Booking Details #{booking.bookingId || booking.id}</h2>

            <div className="card">
                <h3>Booking Info</h3>
                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                <p><strong>Tour:</strong> {booking.tourName || 'Tour ID: ' + booking.tourId}</p>
            </div>

            <div className="card">
                <h3>Passengers</h3>
                {booking.passengers && booking.passengers.length > 0 ? (
                    <ul>
                        {booking.passengers.map((p, idx) => (
                            <li key={idx}><strong>{p.passengerName}</strong> ({p.passengerType}, Age: {p.age})</li>
                        ))}
                    </ul>
                ) : <p>No passenger details.</p>}
            </div>

            <div style={{ marginTop: '20px' }}>
                <Link to="/my-bookings" className="btn btn-primary">Back to My Bookings</Link>
            </div>
        </div>
    );
};

export default BookingDetails;
