import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItineraryByCategory } from "../../api/itineraryApi";

const ItineraryTab = () => {
  const { catmasterId } = useParams();

  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getItineraryByCategory(catmasterId)
      .then(res => {
        setItinerary(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load itinerary");
        setLoading(false);
      });
  }, [catmasterId]);

  if (loading) return <p>Loading itinerary...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (itinerary.length === 0) return <p>No itinerary available.</p>;

  return (
    <div className="space-y-4">
      {itinerary.map(day => (
        <div key={day.dayNumber} className="border p-4 rounded">
          <h3 className="font-semibold">Day {day.dayNumber}</h3>
          <p className="text-gray-600">{day.itineraryDetails}</p>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTab;
