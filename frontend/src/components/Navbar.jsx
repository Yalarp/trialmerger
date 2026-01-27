import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerName, subscribeToAuthChanges, logout as authLogout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState(getCustomerName());

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(() => {
      setCustomerName(getCustomerName());
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    authLogout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">

      {/* Logo */}
      <h2
        onClick={() => navigate("/")}
        className="text-xl font-semibold cursor-pointer"
      >
        E-Tour
      </h2>

      {/* Right section */}
      {customerName ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome, <span className="font-medium">{customerName}</span>
          </span>

          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-3 py-1 text-sm bg-green-500 rounded hover:bg-green-600"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
