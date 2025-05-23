// src/components/ListingCard.jsx
import React from 'react';

const ListingCard = ({ car }) => (
  <div className="border rounded-[16px] p-[30px] shadow-sm bg-white">
    <div className="aspect-[4/3] bg-gray-200 rounded-[16px] mb-2 overflow-hidden">
      {car.photourl && (
        <img

          src={car.photourl.startsWith('uploads/')
            ? `/${car.photourl}`
            : `/uploads/${car.photourl}`}
          alt={`${car.make} ${car.model}`}
          className="object-cover w-full h-full"
        />
      )}
    </div>

    <h3 className="text-lg font-semibold">
      {car.make} {car.model}
    </h3>
    <p className="text-gray-700">Price: ${car.price}</p>
    <p className="text-gray-600 text-sm">Mileage: {car.mileage} km</p>
  </div>
);

export default ListingCard;
