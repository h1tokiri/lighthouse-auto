// client/src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [makes, setMakes] = useState([]); // Tiago
  const [models, setModels] = useState([]); // Tiago

  // Tiago - Beginning
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    make: "",
    model: "",
    postalCode: ""
  });

  const fetchModels = async (selectedMake) => {
    try {
      const response = await fetch(`/api/vehicles/models?make=${selectedMake}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setModels(data);
      } else {
        console.error('Unexpected data format:', data);
        setModels([]);
      }
    } catch (err) {
      console.error('Error fetching models:', err);
      setModels([]);
    }
  };
  // Tiago - End

  useEffect(() => {
    // Tiago - Beginning
    // Fetch makes when component mounts
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMakes(data);
        } else if (data.error) {
          console.error('Error fetching makes:', data.error);
          setMakes([]);
        } else {
          console.error('Unexpected data format:', data);
          setMakes([]);
        }
      })
      .catch(err => {
        console.error('Error fetching makes:', err);
        setMakes([]);
    }, []);
    // Tiago - End

    const dummyData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      make: "Make",
      model: "Model",
      price: 0,
      mileage: 0,
      photoUrl: "",
    }));
    setListings(dummyData);
    fetch("/api/vehicles")
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(console.error);
  }, []);
  // Tiago - Beginning
  // const handleSearchChange = (e) => {
  //   const { name, value } = e.target;
  //   setSearchParams(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'make' && { model: '' })
    }));

    // Fetch models when make changes
    if (name === 'make') {
      fetchModels(value);
    }
  };

  // Add handleSearch function
  const handleSearch = () => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/search?${queryString}`);
  };
  // Tiago - End
  return (
    <div className="min-h-screen bg-base-300">


      <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-primary my-6">
          Recent Listings
        </h1>

{/* --------------------------------------------------- */}
{/* Tiago - Beginning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select
            name="make"
            value={searchParams.make}
            onChange={handleSearchChange}
            className="select select-bordered w-[360px] mx-auto"
          >
            <option value="">Select Make</option>
            {makes.map(make => (
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
            {models.map(model => (
              <option key={model.model} value={model.model}>
                {model.model}
              </option>
            ))}
        {/* Filters span the top three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select className="select select-bordered w-[360px] mx-auto">
            <option>Make</option>
          </select>
          <select className="select select-bordered w-[360px] mx-auto">
            <option>Model</option>
          </select>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="text"
              name="postalCode"
              value={searchParams.postalCode}
              onChange={handleSearchChange}
              placeholder="Postal Code"
              className="input input-bordered w-[360px]"
            />
            <button
              onClick={handleSearch}
              className="btn bg-[#3933E5] text-white font-semibold hover:bg-[#2924b5] w-32"
            >
              Search
            </button>
          </div>
        </div>
{/* Tiago - End */}
            <button className="btn w-32 bg-[#dca54d] text-black hover:bg-[#c49540] active:bg-[#b7853c]">
  Search
</button>

          </div>
        </div>

        {/* The 10 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(listings.length ? listings : Array.from({ length: 10 }))
            .map((listing, i) => (
              <ListingCard
                key={listing?.id ?? i}
                car={listing ?? { make: "", model: "", price: 0, mileage: 0, photoUrl: "" }}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
