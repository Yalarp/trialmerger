import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, getCustomerRole, subscribeToAuthChanges } from '../../utils/auth';

const RequireAdmin = ({ children }) => {
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(isLoggedIn());
    const [role, setRole] = useState(getCustomerRole());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth changes
        const unsubscribe = subscribeToAuthChanges(() => {
            setAuthenticated(isLoggedIn());
            setRole(getCustomerRole());
        });

        // Initial check
        setLoading(false);

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or return null
    }

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== 'ADMIN') {
        // Redirect non-admins to home or a specific "unauthorized" page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireAdmin;
