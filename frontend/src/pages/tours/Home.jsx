import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../../services/categoryService';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategories();
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories. Please try again later.");
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="container"><p>Loading categories...</p></div>;
    if (error) return <div className="container"><p className="error-message">{error}</p></div>;

    return (
        <div className="container home-container">
            <div className="hero-section">
                <h1 className="page-title">Welcome to ETours</h1>
                <p className="hero-text">Explore the world with our premium tour packages.</p>
            </div>

            <h2 className="section-title">Explore Categories</h2>

            <div className="grid-3 category-grid">
                {categories.map((category) => (
                    <div key={category.categoryId || category.id} className="card category-card">
                        {/* If images are available in future, add them here. For now, use a placeholder style */}
                        <div className="category-image-placeholder">
                            <span>{category.categoryName ? category.categoryName.charAt(0) : 'C'}</span>
                        </div>
                        <div className="category-content">
                            <h3>{category.categoryName || category.name}</h3>
                            <p>{category.description || 'Explore our amazing packages in this category.'}</p>
                            <Link to={`/category/${category.categoryId || category.id}`}
                                state={{ name: category.name || category.categoryName, description: category.description }}
                                className="btn btn-primary">
                                View Tours
                            </Link>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <p>No categories available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
