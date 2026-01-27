import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginCustomer } from '../api/customerApi';
import { login } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginCustomer({
        email: formData.email,
        password: formData.password
      });

      // Use central auth utility to handle storage and events
      login(response);

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });

    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            E-Tour
          </Link>
          <h1 className="text-2xl font-bold mt-2">Login</h1>
          <p className="text-sm text-gray-500">
            Sign in to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
