import { useState, useEffect } from "react";
import { getMainCategories } from "../api/categoryApi";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getMainCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Explore Tours</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map(cat => (
                    <CategoryCard
                        key={cat.categoryId}
                        category={cat}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home