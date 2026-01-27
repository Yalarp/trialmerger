import { NavLink, Outlet, useParams } from "react-router-dom";

const TourPage = () => {
  const { catmasterId } = useParams();

  const tabClass = ({ isActive }) =>
    isActive
      ? "px-4 py-2 border-b-2 border-blue-600 font-semibold"
      : "px-4 py-2 text-gray-500";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <NavLink to={`/tours/${catmasterId}`} end className={tabClass}>
          Overview
        </NavLink>
        <NavLink to="cost" className={tabClass}>
          Costs
        </NavLink>
        <NavLink to="departures" className={tabClass}>
          Departure Dates
        </NavLink>

        <NavLink to="itinerary" className={tabClass}>
          Day-wise Itinerary
        </NavLink>
      </div>

      {/* Tab Content */}
      <Outlet />
    </div>
  );
}

export default TourPage