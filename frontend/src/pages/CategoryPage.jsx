import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleCategoryClick } from "../api/categoryApi";
import CategoryCard from "../components/CategoryCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    handleCategoryClick(categoryId)
      .then(res => {
        const response = res.data;

        console.log("FINAL BACKEND RESPONSE 👉", response);

        // SUBCATEGORIES
        if (response.responseType === "SUBCATEGORIES") {
          setSubCategories(response.subcategories || []);
          setLoading(false);
          return;
        }

        // TOUR
        if (response.responseType === "TOUR") {
          navigate(`/tours/${response.tour.catmasterId}`);
          return;
        }

        setError("Invalid response from server");
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load category");
        setLoading(false);
      });
  }, [categoryId, navigate]);

  // 🔹 Loading
  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // 🔹 Error
  if (error) {
    return (
      <p className="p-6 text-red-500 font-semibold">
        {error}
      </p>
    );
  }

  // 🔹 Empty
  if (subCategories.length === 0) {
    return (
      <p className="p-6 text-gray-500">
        No subcategories available.
      </p>
    );
  }

  // 🔹 Success
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subCategories.map(cat => (
          <CategoryCard
            key={cat.categoryId}
            category={cat}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
