import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCostsByCategory } from "../../api/costApi";

const CostTab = () => {
  const { catmasterId } = useParams();

  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getCostsByCategory(catmasterId)
      .then(res => {
        setCosts(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load cost details");
        setLoading(false);
      });
  }, [catmasterId]);

  /* ---------- STATES ---------- */

  if (loading) {
    return <p>Loading cost details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (costs.length === 0) {
    return <p>No cost information available.</p>;
  }

  /* ---------- UI ---------- */

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Valid From</th>
            <th className="border px-3 py-2 text-left">Valid To</th>
            <th className="border px-3 py-2 text-left">Base Cost</th>
            <th className="border px-3 py-2 text-left">Single Person</th>
            <th className="border px-3 py-2 text-left">Extra Person</th>
            <th className="border px-3 py-2 text-left">Child (With Bed)</th>
            <th className="border px-3 py-2 text-left">Child (Without Bed)</th>
          </tr>
        </thead>

        <tbody>
          {costs.map((cost, index) => (
            <tr
              key={`${cost.validFromDate}-${cost.validToDate}-${index}`}
              className="hover:bg-gray-50"
            >
              <td className="border px-3 py-2">
                {cost.validFromDate}
              </td>
              <td className="border px-3 py-2">
                {cost.validToDate}
              </td>
              <td className="border px-3 py-2 font-semibold">
                ₹ {cost.baseCost}
              </td>
              <td className="border px-3 py-2">
                ₹ {cost.singlePersonCost}
              </td>
              <td className="border px-3 py-2">
                ₹ {cost.extraPersonCost}
              </td>
              <td className="border px-3 py-2">
                ₹ {cost.childWithBedCost}
              </td>
              <td className="border px-3 py-2">
                ₹ {cost.childWithoutBedCost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostTab;
