import React, { useState, useEffect } from 'react';
import tourService from '../../services/tourService';

const ManageTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await tourService.getAllTours();
            setTours(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tours", error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="page-title">Manage Tours</h2>
                <button className="btn btn-primary">+ Add New Tour</button>
            </div>

            {loading ? <p>Loading tours...</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Tour Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Duration</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map(tour => (
                            <tr key={tour.tourId || tour.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{tour.tourId || tour.id}</td>
                                <td style={{ padding: '10px' }}>{tour.tourName}</td>
                                <td style={{ padding: '10px' }}>{tour.duration}</td>
                                <td style={{ padding: '10px' }}>
                                    <button style={{ marginRight: '10px', cursor: 'pointer' }}>Edit</button>
                                    <button style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageTours;
