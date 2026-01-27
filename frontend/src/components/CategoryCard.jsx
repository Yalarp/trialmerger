import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleCategoryClick } from "../api/categoryApi";
import { BACKEND_URL } from "../config";

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    const imageUrl = `${BACKEND_URL}${category.imagePath}`

    return (
        <div
            onClick={() => navigate(`/categories/${category.categoryId}`)}
            className="cursor-pointer rounded-lg shadow-md hover:shadow-xl transition p-4"
        >
            <img
                src={imageUrl}
                alt={category.name}
                className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-3">
                {category.name}
            </h2>
        </div>
    );
}

export default CategoryCard