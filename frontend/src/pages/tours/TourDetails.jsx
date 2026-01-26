import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tourService from '../../services/tourService';

const TourDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [costs, setCosts] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState('itinerary');

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                // 1. Get Tour Basic Info (TourMaster)
                const tourRes = await tourService.getTourById(id);
                const tourData = tourRes.data;
                setTour(tourData);

                // 2. Get Related Info using Category ID from TourMaster
                if (tourData.catmaster?.id) {
                    const catId = tourData.catmaster.id;

                    // Parallel fetch for speed
                    const [costsRes, itinRes] = await Promise.all([
                        tourService.getCostsByCategory(catId),
                        tourService.getItinerariesByCategory(catId)
                    ]);

                    setCosts(costsRes.data);
                    setItinerary(itinRes.data);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching tour details:", err);
                setError("Failed to load tour details.");
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [id]);

    if (loading) return <div className="container"><p>Loading...</p></div>;
    if (error) return <div className="container"><p className="error-message">{error}</p></div>;
    if (!tour) return <div className="container"><p>Tour not found.</p></div>;

    const tourName = tour.tourName || tour.name || tour.catmaster?.name || 'Unnamed Tour';
    const duration = tour.duration || (tour.departureDate?.numberOfDays ? `${tour.departureDate.numberOfDays} Days` : 'N/A');

    // Format dates
    const startDate = tour.departureDate?.departureDate ? new Date(tour.departureDate.departureDate).toLocaleDateString() : 'N/A';
    const endDate = tour.departureDate?.endDate ? new Date(tour.departureDate.endDate).toLocaleDateString() : 'N/A';

    return (
        <div className="container">
            <div className="tour-header">
                <h1 className="page-title">{tourName}</h1>
                <div>
                    <span className="tour-duration-badge" style={{ marginRight: '10px' }}>{duration}</span>
                    <span style={{ color: '#666' }}>{startDate} - {endDate}</span>
                </div>
            </div>

            <div className="tour-tabs">
                <button className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`} onClick={() => setActiveTab('itinerary')}>Itinerary</button>
                <button className={`tab-btn ${activeTab === 'costs' ? 'active' : ''}`} onClick={() => setActiveTab('costs')}>Costs</button>
            </div>

            <div className="tab-content">
                {activeTab === 'itinerary' && (
                    <div className="itinerary-list">
                        <h3>Itinerary</h3>
                        {itinerary.length > 0 ? (
                            <ul>
                                {itinerary.map((item, index) => (
                                    <li key={index} className="itinerary-item">
                                        <h4>Day {item.dayNo}: {item.city}</h4>
                                        <p>{item.description || item.program}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No itinerary details available.</p>}
                    </div>
                )}

                {activeTab === 'costs' && (
                    <div className="costs-section">
                        <h3>Pricing</h3>
                        {costs.length > 0 ? (
                            <table className="table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                <thead>
                                    <tr style={{ background: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Cost (₹)</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Valid From</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Valid To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costs.map((cost, idx) => (
                                        <React.Fragment key={idx}>
                                            <tr><td style={{ padding: '8px' }}>Single Person</td><td style={{ padding: '8px' }}>{cost.singlePersonCost}</td><td style={{ padding: '8px' }}>{new Date(cost.activeFrom).toLocaleDateString()}</td><td style={{ padding: '8px' }}>{new Date(cost.activeTo).toLocaleDateString()}</td></tr>
                                            <tr><td style={{ padding: '8px' }}>Twin Sharing</td><td style={{ padding: '8px' }}>{cost.twinSharingCost}</td><td style={{ padding: '8px' }}></td><td style={{ padding: '8px' }}></td></tr>
                                            <tr><td style={{ padding: '8px' }}>Extra Person</td><td style={{ padding: '8px' }}>{cost.extraPersonCost}</td><td style={{ padding: '8px' }}></td><td style={{ padding: '8px' }}></td></tr>
                                            <tr><td style={{ padding: '8px' }}>Child w/ Bed</td><td style={{ padding: '8px' }}>{cost.childWithBedCost}</td><td style={{ padding: '8px' }}></td><td style={{ padding: '8px' }}></td></tr>
                                            <tr><td style={{ padding: '8px' }}>Child w/o Bed</td><td style={{ padding: '8px' }}>{cost.childWithoutBedCost}</td><td style={{ padding: '8px' }}></td><td style={{ padding: '8px' }}></td></tr>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}><td colSpan="4"></td></tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : <p>No cost details available.</p>}
                    </div>
                )}
            </div>

            <div className="book-now-section">
                <Link to={`/booking?tourId=${id}`} className="btn btn-primary btn-large">Book Now</Link>
            </div>
        </div>
    );
};

export default TourDetails;
