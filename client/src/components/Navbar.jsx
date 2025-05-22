import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Example: Replace with your actual auth context/hook
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#3933E5] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Lighthouse Auto
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/vehicles/new" className="hover:underline">
              Create Listing
            </Link>
            <Link to="/my-vehicles" className="hover:underline">
              My Listings
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline bg-transparent border-none cursor-pointer"
              style={{ padding: 0, background: "none" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
