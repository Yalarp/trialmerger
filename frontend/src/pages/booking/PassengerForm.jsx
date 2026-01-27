import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../../api/bookingApi";

const PassengerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ONLY passengers (no primary/secondary concept)
  const [passengers, setPassengers] = useState([
    { name: "", dob: "" }
  ]);

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", dob: "" }]);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleConfirmBooking = async () => {
    // 🚫 Block booking if no passengers
    if (passengers.length === 0) {
      alert("Please add at least one passenger");
      return;
    }

    const customerId = Number(localStorage.getItem("customerId"));
    if (!customerId) {
      alert("Your session has expired or is invalid. Please login again.");
      window.location.href = "/login";
      return;
    }

    try {
      const payload = {
        customerId: customerId, // booking owner
        tourId: state.tourId,
        departureDateId: state.departureDateId,
        roomPreference: "AUTO",
        passengers: passengers.map(p => ({
          passengerName: p.name,
          dateOfBirth: p.dob
        }))
      };

      const res = await createBooking(payload);
      const bookingId = res.data.id;

      navigate(`/booking/${bookingId}/summary`);
    } catch (err) {
      console.error("Booking failed", err);
      alert("Failed to confirm booking");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

      {passengers.map((p, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <input
            className="border p-2 flex-1"
            placeholder="Passenger Name"
            value={p.name}
            onChange={e =>
              handlePassengerChange(i, "name", e.target.value)
            }
            required
          />

          <input
            type="date"
            value={p.dob}
            onChange={e => handlePassengerChange(i, "dob", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addPassenger}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Passenger
      </button>

      <button
        onClick={handleConfirmBooking}
        disabled={passengers.length === 0}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded block disabled:opacity-50"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default PassengerForm;
