import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTourDetails } from "../../api/tourApi";

const Overview = () => {
  const { catmasterId } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTourDetails(catmasterId)
      .then(res => {
        setTour(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [catmasterId]);

  if (loading) return <p>Loading overview...</p>;
  if (!tour) return <p>Tour not found</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{tour.categoryName}</h1>
      <p className="text-gray-600">{tour.description}</p>

      <div className="flex gap-6">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-semibold">{tour.numberOfDays} Days</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-500">Starting From</p>
          <p className="font-semibold">₹ {tour.baseCost} / person</p>
        </div>
      </div>

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/tours/${catmasterId}/book`)}
      >
        Book Now
      </button>
    </div>
  );
};

export default Overview;
