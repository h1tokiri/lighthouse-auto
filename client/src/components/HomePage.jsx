// client/src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";

export default function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/api/vehicles")
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-base-300">


      <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-primary my-6">
          Recent Listings
        </h1>

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
              placeholder="Postal Code"
              className="input input-bordered w-[360px]"
            />
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
