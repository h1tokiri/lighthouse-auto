
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
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
      <Link to="/login" className="hover:underline">
        Login
      </Link>
      <Link to="/create-listing" className="hover:underline">
        Create Listing
      </Link>
    </nav>
  </header>
);

export default Navbar;
