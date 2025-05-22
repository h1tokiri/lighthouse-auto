import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
        <Link to={user && user.id ? "/vehicles/new" : "/login"} className="hover:underline">
          Create Listing
        </Link>
        {user && user.id && (
          <Link to="/my-vehicles" className="hover:underline">
            My Vehicles
          </Link>
        )}
        {!user || !user.id ? (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:underline bg-transparent border-none text-white cursor-pointer"
            style={{ padding: 0, background: "none" }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
