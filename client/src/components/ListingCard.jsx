
import React from 'react';

const ListingCard = ({ car }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-white">
    {/* Always show grey placeholder area; only render <img> when photoUrl exists */}
    <div className="aspect-[4/3] bg-gray-200 rounded mb-2 overflow-hidden">
      {car.photoUrl && (
        <img
          src={car.photoUrl}
          alt={`${car.make} ${car.model}`}
          className="object-cover w-full h-full"
        />
      )}
    </div>

    <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
    <p className="text-gray-700">Price: ${car.price}</p>
    <p className="text-gray-600 text-sm">Mileage: {car.mileage} km</p>
  </div>
);

export default ListingCard;
