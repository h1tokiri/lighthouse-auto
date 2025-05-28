import React from "react";

const ListingCard = ({ car, onClick }) => {
  // const formatNumber = (num) => (typeof num === "number" ? num.toLocaleString() : num);

  const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) {
      return "0";
    }
    return Number(num).toLocaleString();
  };

  return (
    <div
      className={`border rounded-[16px] p-[30px] shadow-sm bg-base-100 cursor-pointer`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter") onClick();
            }
          : undefined
      }
    >
      <div className="aspect-[4/3] bg-neutral rounded-[16px] mb-2 overflow-hidden">
        {car.photourl && (
          <img
            src={
              car.photourl.startsWith("uploads/")
                ? `https://lighthouse-auto.onrender.com/${car.photourl}`
                : `https://lighthouse-auto.onrender.com/uploads/${car.photourl}`
            }
            alt={`${car.make} ${car.model}`}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <h3 className="text-lg font-semibold text-base-content">
        {car.make} {car.model}
      </h3>

      <p className="text-base font-bold text-base-content">Price: ${formatNumber(car.price)}</p>
      <p className="text-sm font-bold text-base-content">Mileage: {formatNumber(car.mileage)} km</p>
    </div>
  );
};

export default ListingCard;
