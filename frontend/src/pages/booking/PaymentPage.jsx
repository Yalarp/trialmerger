import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RAZORPAY_KEY_ID } from "../../config";
import { createRazorpayOrder, verifyPayment, getBookingById } from "../../api/bookingApi";
import { getPassengersByBooking } from "../../api/passengerApi";
import Loader from "../../components/Loader";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await getBookingById(bookingId);
        setBooking(bookingRes.data);
        
        const passengerRes = await getPassengersByBooking(bookingId);
        setPassengers(passengerRes.data);
      } catch (err) {
        setError("Failed to load booking details");
        console.error(err);
      }
    };

    fetchData();
  }, [bookingId]);

  const handlePaymentClick = async () => {
    if (!booking) return;

    setLoading(true);
    setError(null);

    try {
      // Debug: Log booking data structure
      console.log("Booking object:", booking);
      console.log("CustomerName (flat):", booking.customerName);
      console.log("Customer object:", booking.customer);

      // Step 1: Create Razorpay Order
      const orderResponse = await createRazorpayOrder(bookingId, booking.totalAmount);
      console.log("Order Response:", orderResponse.data);
      
      const { orderId, amount, currency } = orderResponse.data;

      // Handle BOTH flat and nested customer/tour structures
      const customerName = booking.customerName || booking.customer?.name || "";
      const customerEmail = booking.customerEmail || booking.customer?.email || "";
      const customerMobile = booking.customerMobile || booking.customer?.mobileNumber || "";
      const customerId = booking.customerId || booking.customer?.id || "";

      // Log for debugging
      console.log("Resolved Prefill:", { customerName, customerEmail, customerMobile, customerId });

      // Validate that we have required fields
      if (!orderId || !amount || !customerEmail) {
        setError("Missing required payment information. Please refresh and try again.");
        setLoading(false);
        return;
      }

      // Step 2: Prepare Razorpay Options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount, // Already in paise from backend
        currency: currency,
        order_id: orderId,
        name: "E-Tour",
        description: `Booking #${bookingId} Payment`,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerMobile,
        },
        theme: {
          color: "#0ea5e9",
        },
        handler: (response) => {
          // Step 3: Verify Payment
          verifyPaymentWithBackend(response);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment was cancelled");
          },
        },
      };

      // Step 4: Open Razorpay Checkout
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError("Razorpay SDK not loaded");
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initiate payment");
      setLoading(false);
      console.error("Payment Error:", err);
    }
  };

  const verifyPaymentWithBackend = async (razorpayResponse) => {
    try {
      // Call backend to verify payment
      await verifyPayment({
        bookingId: bookingId,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
      });

      // Payment verified successfully
      setLoading(false);
      navigate(`/payment/success/${bookingId}`);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Payment verification failed");
      console.error(err);
      // Optionally navigate to failure page
      navigate(`/payment/failure`, { state: { error: err.response?.data?.message } });
    }
  };

  if (!booking) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Complete Payment</h1>
          <p className="text-gray-600 mt-2">Booking #{bookingId}</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Booking Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>

          {/* Tour Details */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Tour Details</h3>
            <p className="text-gray-600">
              <span className="font-medium">Tour:</span> {booking.tourDescription}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Departure Date:</span> {booking.departureDate}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Passengers:</span> {passengers.length}
            </p>
          </div>

          {/* Customer Details */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Customer Details</h3>
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {booking.customerName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {booking.customerEmail}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> {booking.customerMobile}
            </p>
          </div>

          {/* Passenger List */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Passengers</h3>
            <ul className="space-y-2">
              {passengers.map((passenger, idx) => (
                <li key={idx} className="text-gray-600">
                  {idx + 1}. {passenger.passengerName}
                </li>
              ))}
            </ul>
          </div>

          {/* Amount Breakdown */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Tour Amount:</span>
              <span className="font-semibold">₹{booking.tourAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-blue-200">
              <span className="text-gray-700">Tax (5%):</span>
              <span className="font-semibold">₹{booking.taxAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-800">Total Amount:</span>
              <span className="font-bold text-blue-600">₹{booking.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Booking Status */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            <span className="font-semibold">Booking Status:</span> {booking.bookingStatus}
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            Please complete the payment to confirm your booking.
          </p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePaymentClick}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-bold text-white text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:bg-green-800"
          }`}
        >
          {loading ? "Processing..." : `Pay ₹${booking.totalAmount?.toFixed(2)}`}
        </button>

        {/* Info Message */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
          <p>
            💳 You will be redirected to Razorpay payment gateway. This is a secure payment process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
