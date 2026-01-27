import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error || "Payment was unsuccessful";

  const handleRetry = () => {
    // Go back to home - user can start again
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">We couldn't process your payment</p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-700">
              <span className="font-semibold">Reason:</span> {error}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">What happened?</span>
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Your payment could not be processed</li>
              <li>Your card was declined</li>
              <li>You cancelled the transaction</li>
              <li>A technical error occurred</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">💡 Tip:</span> Please verify your
              card details and try again. Contact your bank if the issue persists.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full py-3 px-6 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition"
          >
            🏠 Return to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 px-6 rounded-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition"
          >
            ↩️ Go Back
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded text-center">
          <p className="text-sm text-gray-600">
            Still having trouble?
          </p>
          <p className="text-sm text-gray-600 font-semibold mt-1">
            Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
