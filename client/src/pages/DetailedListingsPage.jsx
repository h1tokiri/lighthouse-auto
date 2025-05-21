import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const placeholder = "https://via.placeholder.com/600x400?text=Vehicle+Photo";

const DetailedListingsPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => {
        // Sort photos: primary first
        if (data.photos && data.photos.length > 0) {
          data.photos.sort((a, b) => (b.isprimary ? 1 : 0) - (a.isprimary ? 1 : 0));
        }
        setVehicle(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!vehicle) return <div>Vehicle not found.</div>;

  const photos = vehicle.photos && vehicle.photos.length > 0 ? vehicle.photos : [{ photourl: placeholder, caption: "No photo" }];
  const currentPhoto = photos[photoIndex];

  const handlePrev = () => setPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const handleNext = () => setPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  return (
    <div className="detailed-listing">
      <div className="photo-carousel">
        <button className="carousel-arrow left" onClick={handlePrev} aria-label="Previous photo">&#8592;</button>
        <img
          src={`http://localhost:3001/${currentPhoto.photourl}`}
          alt={currentPhoto.caption || "Vehicle photo"}
          className="vehicle-photo"
        />
        <button className="carousel-arrow right" onClick={handleNext} aria-label="Next photo">&#8594;</button>
      </div>
      <div className="photo-caption">{currentPhoto.caption}</div>
      <h1 className="vehicle-title">{vehicle.make} {vehicle.model} ({vehicle.year})</h1>
      <ul className="vehicle-details">
        <li><strong>Price:</strong> ${vehicle.price}</li>
        <li><strong>Mileage:</strong> {vehicle.mileage} km</li>
        <li><strong>VIN:</strong> {vehicle.vin}</li>
        <li><strong>Color:</strong> {vehicle.color}</li>
        <li><strong>Transmission:</strong> {vehicle.transmission}</li>
        <li><strong>Body Style:</strong> {vehicle.bodystyle}</li>
        <li><strong>Engine Cylinders:</strong> {vehicle.enginecylinders}</li>
        <li><strong>Condition:</strong> {vehicle.condition}</li>
        <li><strong>Listing Address:</strong> {vehicle.listingaddress}</li>
        <li><strong>Created On:</strong> {new Date(vehicle.createdon).toLocaleDateString()}</li>
      </ul>
      <div>
        <strong>Description:</strong>
        <p>{vehicle.description}</p>
      </div>
    </div>
  );
};

export default DetailedListingsPage;
