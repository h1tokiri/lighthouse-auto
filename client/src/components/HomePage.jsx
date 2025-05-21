import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ListingCard from './ListingCard';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const dummyData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      make: 'Make',
      model: 'Model',
      price: 0,
      mileage: 0,
      photoUrl: ''
    }));
    setListings(dummyData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-600 my-6">Recent Listings</h1>

        {/* Search Filters spanning top 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select className="select select-bordered w-[360px] mx-auto">
            <option value="">Make</option>
          </select>
          <select className="select select-bordered w-[360px] mx-auto">
            <option value="">Model</option>
          </select>
          <div className="flex space-x-4 justify-center">
            <input
              type="text"
              placeholder="Postal Code"
              className="input input-bordered w-[360px]"
            />
            <button className="btn bg-[#3933E5] text-white font-semibold hover:bg-[#2924b5] w-32">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} car={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
