import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById, downloadInvoice, resendInvoiceEmail } from "../../api/bookingApi";
import { getPassengersByBooking } from "../../api/passengerApi";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [resending, setResending] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await getBookingById(bookingId);
        setBooking(bookingRes.data);

        const passengerRes = await getPassengersByBooking(bookingId);
        setPassengers(passengerRes.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load booking details");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [bookingId]);

  const handleDownloadInvoice = async () => {
    setDownloading(true);
    setError(null);
    try {
      const response = await downloadInvoice(bookingId);
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      toast.success("Invoice downloaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setDownloading(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to download invoice";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(errorMsg);
      setDownloading(false);
      console.error(err);
    }
  };

  const handleResendInvoice = async () => {
    setResending(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await resendInvoiceEmail(bookingId);
      const successMsg = "Invoice has been resent to your email!";
      toast.success(successMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSuccessMessage(successMsg);
      setResending(false);

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to resend invoice";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(errorMsg);
      setResending(false);
      console.error(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Failed to load booking details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded flex justify-between items-center">
            <span>✓ {successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-700 hover:text-green-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>

          {/* Booking ID and Status */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="text-lg font-bold text-gray-800">{bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Booking Status</p>
              <p className="text-lg font-bold text-green-600">
                {booking.bookingStatus}
              </p>
            </div>
          </div>

          {/* Tour Information */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Tour Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Tour:</span> {booking.tourDescription}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> {booking.tourCategoryName}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Departure Date:</span>{" "}
                {booking.departureDate}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">End Date:</span> {booking.endDate}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Days:</span> {booking.numberOfDays} days
              </p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Customer Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {booking.customerName}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {booking.customerEmail}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span>{" "}
                {booking.customerMobile}
              </p>
            </div>
          </div>

          {/* Passengers */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">
              Passengers ({passengers.length})
            </h3>
            <ul className="space-y-2">
              {passengers.map((passenger, idx) => (
                <li key={idx} className="text-gray-600">
                  <span className="font-medium">{idx + 1}.</span> {passenger.passengerName}
                </li>
              ))}
            </ul>
          </div>

          {/* Amount Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Tour Amount:</span>
              <span className="font-semibold">₹{booking.tourAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-green-200">
              <span className="text-gray-700">Tax (5%):</span>
              <span className="font-semibold">₹{booking.taxAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-800">Total Paid:</span>
              <span className="font-bold text-green-600">
                ₹{booking.totalAmount?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadInvoice}
            disabled={downloading}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white transition ${
              downloading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {downloading ? "Downloading..." : "📥 Download Invoice"}
          </button>

          <button
            onClick={handleResendInvoice}
            disabled={resending}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white transition ${
              resending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"
            }`}
          >
            {resending ? "Sending..." : "📧 Resend Invoice to Email"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-6 rounded-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition"
          >
            📖 Browse More Tours
          </button>

          <button
            onClick={() => navigate(`/bookings/${bookingId}`)}
            className="w-full py-3 px-6 rounded-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition"
          >
            📋 View Full Booking Details
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">✓ Confirmation email</span> has been sent to{" "}
            <span className="font-semibold">{booking.customerEmail}</span>
          </p>
          <p className="text-sm text-blue-700 mt-2">
            You can download your invoice anytime from your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
