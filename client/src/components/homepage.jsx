import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import ListingCard from './ListingCard';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/listings?limit=10')
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => console.error('Failed to fetch listings:', err));
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-600">It works!</h1>

      <h1>Recent Listings</h1>
      <div className="listing-grid">
        {listings.length === 0 ? (
          <p>No listings yet.</p>
        ) : (
          listings.map(listing => (
            <ListingCard key={listing.id} car={listing} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
