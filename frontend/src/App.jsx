import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';

// Tours
import Home from './pages/tours/Home';
import SubCategory from './pages/tours/SubCategory';
import TourList from './pages/tours/TourList';
import TourDetails from './pages/tours/TourDetails';

// Search
import SearchResults from './pages/search/SearchResults';

// Booking
import BookingForm from './pages/booking/BookingForm';
import BookingSummary from './pages/booking/BookingSummary';

// Payment
import PaymentPage from './pages/payment/PaymentPage';
import PaymentSuccess from './pages/payment/PaymentSuccess';

// Dashboard
import MyBookings from './pages/dashboard/MyBookings';
import BookingDetails from './pages/dashboard/BookingDetails';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageTours from './pages/admin/ManageTours';
import ManageCosts from './pages/admin/ManageCosts';
import UploadExcel from './pages/admin/UploadExcel';
import ViewAllBookings from './pages/admin/ViewAllBookings';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            {/* Tour Routes */}
            <Route path="/category/:id" element={<SubCategory />} />
            <Route path="/tours" element={<TourList />} />
            <Route path="/tours/:id" element={<TourDetails />} />

            {/* Search */}
            <Route path="/search" element={<SearchResults />} />

            {/* Booking */}
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/booking-summary" element={<BookingSummary />} />

            {/* Payment */}
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />

            {/* Customer Dashboard */}
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/booking/:id" element={<BookingDetails />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/tours" element={<ManageTours />} />
            <Route path="/admin/costs" element={<ManageCosts />} />
            <Route path="/admin/upload" element={<UploadExcel />} />
            <Route path="/admin/bookings" element={<ViewAllBookings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
