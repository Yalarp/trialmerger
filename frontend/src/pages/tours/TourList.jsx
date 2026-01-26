import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import tourService from '../../services/tourService';

const TourList = ({ catIdProp }) => {
    const [searchParams] = useSearchParams();
    const catId = catIdProp || searchParams.get('cat');

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await tourService.getAllTours();
                // Client side filter if API doesn't support filtering by catId directly
                // Or if API has /api/tours/category/{id}, we should use that.
                // For now, fetching all and filtering.
                let allTours = response.data;
                if (catId) {
                    // Assuming tour has categoryId or similar field
                    allTours = allTours.filter(t => t.categoryId === parseInt(catId) || t.category?.id === parseInt(catId));
                }
                setTours(allTours);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching tours:", err);
                setError("Failed to load tours.");
                setLoading(false);
            }
        };

        fetchTours();
    }, [catId]);

    if (loading) return <div className="container"><p>Loading tours...</p></div>;
    if (error) return <div className="container"><p className="error-message">{error}</p></div>;

    return (
        <div className="container">
            <h2 className="page-title">{catId ? 'Tours in Category' : 'All Tours'}</h2>

            <div className="grid-3">
                {tours.map(tour => (
                    <div key={tour.tourId || tour.id} className="card tour-card">
                        <div className="tour-image-placeholder">
                            <span>{(tour.tourName || tour.catmaster?.name || 'T').charAt(0)}</span>
                        </div>
                        <div className="tour-content">
                            <h3>{tour.tourName || tour.name || tour.catmaster?.name || 'Unnamed Tour'}</h3>
                            <p className="tour-duration">
                                {tour.duration || (tour.departureDate?.numberOfDays ? `${tour.departureDate.numberOfDays} Days` : 'N/A')}
                            </p>
                            <div className="tour-actions">
                                <Link to={`/tours/${tour.tourId || tour.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
                {tours.length === 0 && <p>No tours found.</p>}
            </div>
        </div>
    );
};

export default TourList;
