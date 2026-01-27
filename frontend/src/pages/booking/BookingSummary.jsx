import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById } from "../../api/bookingApi";
import { getPassengersByBooking } from "../../api/passengerApi";

const BookingSummary = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    getBookingById(bookingId).then(res => setBooking(res.data));
    getPassengersByBooking(bookingId).then(res => setPassengers(res.data));
  }, [bookingId]);

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">Booking Summary</h2>

      <p>Total Passengers: {passengers.length}</p>
      <p>Total Cost: ₹ {booking.totalAmount}</p>

      <button
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        onClick={() => navigate(`/payment/${bookingId}`)}
      >
        Pay Now
      </button>
    </div>
  );
};

export default BookingSummary;
