// src/components/ListingCard.jsx
import React from 'react';

const ListingCard = ({ car }) => {
  console.log('car:', car);

  return (
    <div className="listing-card">
      <img src={car.photoUrl || 'https://via.placeholder.com/150'} alt={car.model} />
      <h2>{car.make} {car.model}</h2>
      <h1>Pic goes here</h1>
      <h1 style={{ background: 'yellow' }}>Pic goes here</h1>
      <p>Price: ${car.price}</p>
      <p>Mileage: {car.mileage} km</p>

    </div>
  );
};

export default ListingCard;
