import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTourDetails } from "../../api/tourApi";
import { getDepartureDatesByCategory } from "../../api/departureApi";

const BookingPage = () => {
    const { catmasterId } = useParams();
    const navigate = useNavigate();

    const [tour, setTour] = useState(null);
    const [departureDates, setDepartureDates] = useState([]);
    const [departureDateId, setDepartureDateId] = useState("");

    useEffect(() => {
        getTourDetails(catmasterId).then(res => {
            setTour(res.data.tour ?? res.data);
        });

        getDepartureDatesByCategory(catmasterId).then(res => {
            setDepartureDates(res.data || []);
        });
    }, [catmasterId]);

    if (!tour) {
        return <p className="p-6">Loading booking details...</p>;
    }

    const handleAddPassengers = () => {
        if (!departureDateId) {
            alert("Please select a departure date");
            return;
        }

        navigate("/booking/passengers", {
            state: {
                catmasterId,
                departureDateId,
                catmasterId,
                departureDateId,
                tourName: tour.tourName,
                tourId: tour.tourId || tour.id
            }
        });
    };



    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                {tour.tourName}
            </h1>

            <label className="block mb-2 font-medium">
                Select Departure Date
            </label>

            <select
                className="border p-2 w-full"
                value={departureDateId}
                onChange={e => setDepartureDateId(e.target.value)}
            >
                <option value="">-- Select --</option>
                {departureDates.map(d => (
                    <option key={d.id} value={d.id}>
                        {d.departureDate} ({d.numberOfDays} Days)
                    </option>
                ))}
            </select>

            <button
                className="mt-8 bg-blue-600 text-white px-6 py-2 rounded"
                onClick={handleAddPassengers}
            >
                Add Passengers
            </button>
        </div>
    );
};

export default BookingPage;
