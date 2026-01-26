import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authService.login(formData);
            // Assuming response.data contains user info or token
            // If backend returns only status, we might need to fetch user separately or just store what is returned.
            // Based on typical JWT or Session auth:
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                // If token provided separately
                if (response.data.token) localStorage.setItem('token', response.data.token);

                // Force reload or use Context to update Navbar state
                window.location.href = '/';
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-container" style={{ maxWidth: '400px', margin: '40px auto' }}>
                <h2 className="page-title text-center">Login</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="card">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '20px' }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
