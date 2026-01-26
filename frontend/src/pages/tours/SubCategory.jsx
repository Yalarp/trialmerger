import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import categoryService from '../../services/categoryService';
import TourList from './TourList';

const SubCategory = () => {
    const { id } = useParams();
    const location = useLocation();
    const { name, description } = location.state || {}; // Get from state if available

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoryService.getSubCategories(id);
                setCategory(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching subcategories:", err);
                setError("Failed to load category details.");
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    if (loading) return <div className="container"><p>Loading...</p></div>;
    if (error) return <div className="container"><p className="error-message">{error}</p></div>;

    // Handle different response types from backend
    if (category?.responseType === 'TOUR' && category.tour) {
        return (
            <div className="container">
                <h2 className="page-title">{category.tour.tourName}</h2>
                <p>{category.tour.description}</p>
                <Link to={`/tours/${category.tour.tourId || category.tour.id}`} className="btn btn-primary">View Tour Details</Link>
            </div>
        );
    }

    // Handle Subcategories
    const subCats = category?.subcategories || [];

    // Fallback title
    const displayTitle = name || category?.name || id;

    return (
        <div className="container">
            <h2 className="page-title">{displayTitle}</h2>
            {description && <p style={{ marginBottom: '20px' }}>{description}</p>}

            {subCats.length > 0 ? (
                <div className="grid-3">
                    {subCats.map(sub => (
                        <Link
                            key={sub.id || sub.categoryId}
                            to={sub.flag ? `/tours?cat=${sub.id}` : `/category/${sub.categoryId}`}
                            state={{ name: sub.name, description: sub.description }}
                            className="card category-card"
                        >
                            <div className="category-image-placeholder">
                                <span>{(sub.name || sub.categoryId || 'S').charAt(0)}</span>
                            </div>
                            <div className="category-content">
                                <h3>{sub.name || sub.categoryId}</h3>
                                <p>{sub.description || 'View details'}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div>
                    {/* If no subcategories, show the tours for this category directly */}
                    <p>Browse all tours in {displayTitle}</p>
                    {/* 
                  Since TourList reads from URL param 'cat', we need to check if 
                  TourList logic supports filtering by 'id' we pass.
                  TourList currently reads `searchParams.get('cat')`.
                  We can't easily embed it unless we refactor TourList to accept props.
                  Let's assume we can refactor TourList or we pass props.
               */}
                    {/* 
                  Wait, TourList is default export. I need to modify it to accept props 
                  to override searchParams if provided.
               */}
                    <TourListWrapper catId={id} />
                </div>
            )}
        </div>
    );
};

// Wrapper to pass props to TourList (needs modification in TourList to accept props)
// Or I can just duplicate the logic if I don't want to modify TourList too much?
// Better to modify TourList to accept props.
const TourListWrapper = ({ catId }) => {
    // We can't actually pass props to TourList unless we modify TourList first.
    // I will write TourList modification NEXT. 
    // For now, I will render TourLink logic here duplicate, or assume TourList handles props.
    // Actually, I will modify TourList in the next step to accept `catId` prop.
    return <TourList catIdProp={catId} />;
}


export default SubCategory;
