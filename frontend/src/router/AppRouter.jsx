import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import TourPage from "../pages/tour/TourPage";
import Overview from "../pages/tour/Overview";
import CostTab from "../pages/tour/CostTab";
import DeparturedateTab from "../pages/tour/DepartureDateTab";
import ItineraryTab from "../pages/tour/ItineraryTab";
import BookingPage from "../pages/booking/BookingPage";
import PassengerForm from "../pages/booking/PassengerForm";
import BookingSummary from "../pages/booking/BookingSummary";
import PaymentPage from "../pages/booking/PaymentPage";
import PaymentSuccess from "../pages/booking/PaymentSuccess";
import PaymentFailure from "../pages/booking/PaymentFailure";
import BookingDetailsPage from "../pages/BookingDetailsPage";
import RequireLogin from "../components/RequireLogin";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Navbar from "../components/Navbar";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />

        {/* <Route path="/tours/:catmasterId" element={<TourDetails />} /> */}

        <Route path="/tours/:catmasterId" element={
          <TourPage />} >
          <Route index element={<Overview />} />
          <Route path="cost" element={<CostTab />} />
          <Route path="departures" element={<DeparturedateTab />} />
          <Route path="itinerary" element={<ItineraryTab />} />
        </Route>

        <Route
          path="/tours/:catmasterId/book"
          element={
            <RequireLogin>
              <BookingPage />
            </RequireLogin>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/booking/passengers" element={<PassengerForm />} />
        <Route path="/booking/:bookingId/passengers" element={<PassengerForm />} />

        <Route path="/booking/:bookingId/summary" element={<BookingSummary />} />

        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/payment/success/:bookingId" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />

        <Route
          path="/bookings/:bookingId"
          element={
            <RequireLogin>
              <BookingDetailsPage />
            </RequireLogin>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}
