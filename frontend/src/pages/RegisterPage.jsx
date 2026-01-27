import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerCustomer } from '../api/customerApi';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    agreeTerms: false,
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const customerData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        state: formData.state
      };

      await registerCustomer(customerData);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            E-Tour
          </Link>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-sm text-gray-500">
            Start your journey with us
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
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 underline">
                Terms & Conditions
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
