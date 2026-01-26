import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        minPrice: '',
        maxPrice: '',
        duration: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Filter out empty params
        const query = new URLSearchParams();
        Object.keys(searchParams).forEach(key => {
            if (searchParams[key]) query.append(key, searchParams[key]);
        });

        navigate(`/search?${query.toString()}`);
    };

    return (
        <div className="card search-card">
            <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Find Your Perfect Tour</h3>
            <form onSubmit={handleSearch}>
                <div className="search-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="form-group">
                        <label>Min Price</label>
                        <input type="number" name="minPrice" placeholder="Min ₹" value={searchParams.minPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Max Price</label>
                        <input type="number" name="maxPrice" placeholder="Max ₹" value={searchParams.maxPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Duration (Days)</label>
                        <input type="number" name="duration" placeholder="e.g. 5" value={searchParams.duration} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={searchParams.startDate} onChange={handleChange} />
                    </div>
                    {/* End Date might be optional or calculated, but user asked for date range */}
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Search Tours</button>
            </form>
        </div>
    );
};

export default SearchBar;
