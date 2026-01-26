import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import tourService from '../../services/tourService';
import authService from '../../services/authService';
import bookingService from '../../services/bookingService';
import PassengerForm from '../../components/booking/PassengerForm';
import RoomPreference from '../../components/booking/RoomPreference';

const BookingForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const tourId = searchParams.get('tourId');

    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [departures, setDepartures] = useState([]);

    // Form State
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const [passengers, setPassengers] = useState([
        { passengerName: '', age: '', gender: '', passengerType: 'Adult' }
    ]);
    const [roomPreference, setRoomPreference] = useState('AUTO');

    useEffect(() => {
        // Check Auth
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            alert("Please login to book a tour.");
            navigate('/login');
            return;
        }
        setUser(currentUser);

        const fetchTourInfo = async () => {
            if (!tourId) {
                setError("No tour selected.");
                setLoading(false);
                return;
            }
            try {
                const response = await tourService.getTourById(tourId);
                setTour(response.data);

                // Get departures for this tour
                if (response.data.categoryId) {
                    const depRes = await tourService.getDeparturesByCategory(response.data.categoryId);
                    setDepartures(depRes.data);
                }
                // Or use other method if implemented

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load booking info.");
                setLoading(false);
            }
        };
        fetchTourInfo();
    }, [tourId, navigate]);


    const handlePassengerChange = (index, field, value) => {
        const updated = [...passengers];
        updated[index][field] = value;
        setPassengers(updated);
    };

    const addPassenger = () => {
        setPassengers([...passengers, { passengerName: '', age: '', gender: '', passengerType: 'Adult' }]);
    };

    const removePassenger = (index) => {
        const updated = [...passengers];
        updated.splice(index, 1);
        setPassengers(updated);
    };

    const calculateTotal = () => {
        // Placeholder calc logic based on costs
        // This should ideally be done on backend or using precise cost logic available in costs object
        // For now returning 0 or placeholder.
        return 0; // The BookingSummary page or Backend usually handles true calc.
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDeparture) {
            alert("Please select a departure date.");
            return;
        }

        // Construct Booking Object
        /*
           Assuming Backend accepts:
           {
               customerId: ...,
               tourId: ...,
               departureDate: ..., // or departureId
               passengers: [...],
               roomType: ...
           }
        */
        const bookingData = {
            customerId: user.id || user.customerId, // Adjust based on user object
            tourId: parseInt(tourId),
            departureId: parseInt(selectedDeparture), // Assuming departure selection is ID
            nop: passengers.length,
            bookingDate: new Date().toISOString(), // Today
            passengers: passengers,
            roomType: roomPreference
            // totalAmount handled by backend or calculated? 
        };

        setLoading(true);
        try {
            const response = await bookingService.createBooking(bookingData);
            // Navigate to payment or success
            // Assuming response contains booking ID
            const bookingId = response.data.bookingId || response.data.id;
            navigate(`/payment?bookingId=${bookingId}`);
        } catch (err) {
            console.error("Booking error:", err);
            alert("Booking failed: " + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    if (loading) return <div className="container"><p>Loading...</p></div>;
    if (error) return <div className="container"><p className="error-message">{error}</p></div>;

    return (
        <div className="container">
            <h2 className="page-title">Book Tour: {tour?.tourName}</h2>

            <form onSubmit={handleSubmit}>
                <div className="card">
                    <h3>Select Departure</h3>
                    <div className="form-group">
                        <select value={selectedDeparture} onChange={(e) => setSelectedDeparture(e.target.value)} required>
                            <option value="">-- Select Date --</option>
                            {departures.map(dep => (
                                <option key={dep.departureId || dep.id} value={dep.departureId || dep.id}>
                                    {new Date(dep.startDate).toLocaleDateString()} - {new Date(dep.endDate).toLocaleDateString()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h3>Passenger Details</h3>
                {passengers.map((p, idx) => (
                    <PassengerForm
                        key={idx}
                        index={idx}
                        passenger={p}
                        onChange={handlePassengerChange}
                        onRemove={removePassenger}
                        showRemove={passengers.length > 1}
                    />
                ))}
                <button type="button" onClick={addPassenger} className="btn" style={{ marginBottom: '20px', background: '#eee', color: '#333' }}>+ Add Passenger</button>

                <RoomPreference value={roomPreference} onChange={setRoomPreference} />

                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                    <button type="submit" className="btn btn-primary btn-large">Proceed to Payment</button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
