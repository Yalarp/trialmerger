import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container">
            <h2 className="page-title">Admin Dashboard</h2>
            <div className="grid-3">
                <Link to="/admin/tours" className="card" style={{ textAlign: 'center', padding: '40px 20px', textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ color: 'var(--accent-color)' }}>Manage Tours</h3>
                    <p>Add, Edit, Delete Tours</p>
                </Link>
                <Link to="/admin/costs" className="card" style={{ textAlign: 'center', padding: '40px 20px', textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ color: 'var(--accent-color)' }}>Manage Costs</h3>
                    <p>Update Tour Pricing</p>
                </Link>
                <Link to="/admin/bookings" className="card" style={{ textAlign: 'center', padding: '40px 20px', textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ color: 'var(--accent-color)' }}>All Bookings</h3>
                    <p>View all customer bookings</p>
                </Link>
                <Link to="/admin/upload" className="card" style={{ textAlign: 'center', padding: '40px 20px', textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ color: 'var(--accent-color)' }}>Upload Excel</h3>
                    <p>Bulk upload tours</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
