// client/src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    make: "",
    model: "",
    postalCode: "",
  });

  useEffect(() => {
    document.title = "Home Page";
  }, []);

  const fetchModels = async (selectedMake) => {
    try {
      const response = await fetch(
        `https://lighthouse-auto.onrender.com/api/vehicles/models?make=${selectedMake}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setModels(data);
      } else {
        console.error("Unexpected data format:", data);
        setModels([]);
      }
    } catch (err) {
      console.error("Error fetching models:", err);
      setModels([]);
    }
  };

  useEffect(() => {
    // Fetch makes when component mounts
    fetch("https://lighthouse-auto.onrender.com/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Extract unique makes from data
          const uniqueMakes = Array.from(new Set(data.map((vehicle) => vehicle.make))).map(
            (makeName) => ({ make: makeName })
          );

          setMakes(uniqueMakes);
        } else {
          console.error("Unexpected data format:", data);
          setMakes([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching makes:", err);
        setMakes([]);
      });

    const dummyData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      make: "Make",
      model: "Model",
      price: 0,
      mileage: 0,
      photoUrl: "",
    }));
    setListings(dummyData);
    fetch("https://lighthouse-auto.onrender.com/api/vehicles")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(console.error);
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "make" && { model: "" }),
    }));

    // Fetch models when make changes
    if (name === "make") {
      fetchModels(value);
    }
  };

  // Add handleSearch function
  const handleSearch = () => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/search?${queryString}`);
  };

  return (
    <div className="min-h-screen bg-base-300 pt-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary my-6">Recent Listings</h1>

        {/* Search filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select
            name="make"
            value={searchParams.make}
            onChange={handleSearchChange}
            className="select select-bordered w-[360px] mx-auto"
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make.make} value={make.make}>
                {make.make}
              </option>
            ))}
          </select>

          <select
            name="model"
            value={searchParams.model}
            onChange={handleSearchChange}
            className="select select-bordered w-[360px] mx-auto"
          >
            <option value="">Model</option>
            {models.map((model) => (
              <option key={model.model} value={model.model}>
                {model.model}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-center space-x-4">
            <input
              type="text"
              name="postalCode"
              value={searchParams.postalCode}
              onChange={handleSearchChange}
              placeholder="Postal Code"
              className="input input-bordered w-[250px]"
            />
            <button
              onClick={handleSearch}
              className="btn bg-[#3933E5] text-white font-semibold hover:bg-[#2924b5] w-32"
            >
              Search
            </button>
          </div>
        </div>

        {/* The listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(listings.length ? listings : Array.from({ length: 10 })).map((listing, i) => (
            <ListingCard
              key={listing?.id ?? i}
              car={listing ?? { make: "", model: "", price: 0, mileage: 0, photoUrl: "" }}
              onClick={() => listing?.id && navigate(`/vehicles/${listing.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
