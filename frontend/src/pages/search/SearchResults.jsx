import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import tourService from '../../services/tourService';
import SearchBar from '../../components/search/SearchBar';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                // Convert searchParams to object
                const params = {};
                for (let [key, value] of searchParams.entries()) {
                    params[key] = value;
                }

                // Only call API if there function params, else maybe show all?
                // "SearchResults shows filtered tours."
                const response = await tourService.searchTours(params);
                setTours(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Search error:", err);
                setError("Failed to fetch search results.");
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchParams]);

    return (
        <div className="container">
            <h2 className="page-title">Search Results</h2>

            <div style={{ marginBottom: '30px' }}>
                <SearchBar />
            </div>

            {loading ? <p>Searching...</p> : (
                <>
                    {error && <p className="error-message">{error}</p>}

                    <div className="grid-3">
                        {tours.length > 0 ? tours.map(tour => (
                            <div key={tour.tourId || tour.id} className="card tour-card">
                                <div className="tour-image-placeholder">
                                    <span>{tour.tourName?.charAt(0) || 'T'}</span>
                                </div>
                                <div className="tour-content">
                                    <h3>{tour.tourName || tour.name}</h3>
                                    <p className="tour-duration">{tour.duration || 'N/A'}</p>
                                    <div className="tour-actions">
                                        <Link to={`/tours/${tour.tourId || tour.id}`} className="btn btn-primary">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            !loading && !error && <p>No tours found matching your criteria.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchResults;
