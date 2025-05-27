import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/lighthouse-logo-loose.svg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-base-100 text-base-content px-6 py-3 h-20 flex items-center justify-between border-b border-base-300 fixed top-0 w-full z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center h-24 ml-4 overflow-hidden">
  <img
    src={logo}
    alt="Lighthouse Auto Logo"
    className="h-28 w-auto -mt-16 scale-110"
  />
</Link>



      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link
          to={user && user.id ? "/vehicles/new" : "/login"}
          className="hover:underline"
        >
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
            className="hover:underline bg-transparent border-none text-inherit cursor-pointer"
            style={{ padding: 0 }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
