import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const placeholder = "https://via.placeholder.com/600x400?text=Vehicle+Photo";

const DetailedListingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // <-- get user from AuthContext
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    document.title = "Details";
  }, [id]);

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          data.photos.sort((a, b) => (b.isprimary ? 1 : 0) - (a.isprimary ? 1 : 0));
        }
        setVehicle(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!vehicle) return <div>Vehicle not found.</div>;

  const photos =
    vehicle.photos && vehicle.photos.length > 0
      ? vehicle.photos
      : [{ photourl: placeholder, caption: "No photo" }];
  const currentPhoto = photos[photoIndex];

  const handlePrev = () => setPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const handleNext = () => setPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  const handleContactClick = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    } else {
      setShowContact(!showContact);
    }
  };

  return (
    <div style={{ backgroundColor: "#2f2d2d" }} className="min-h-screen py-10 px-4">
      <div
        className="p-6 max-w-3xl mx-auto rounded shadow"
        style={{ backgroundColor: "#0b0909", color: "#dca54c" }}
      >
        <h1 className="text-2xl font-bold mb-4">
          {vehicle.make} {vehicle.model} ({vehicle.year})
        </h1>

        {/* Photo carousel */}
        <div className="photo-carousel mb-2 flex items-center justify-between gap-4">
          <button className="text-2xl" onClick={handlePrev} aria-label="Previous photo">
            &#8592;
          </button>
          <img
            src={`http://localhost:3001/${currentPhoto.photourl}`}
            alt={currentPhoto.caption || "Vehicle photo"}
            className="w-full max-h-[400px] object-contain"
          />
          <button className="text-2xl" onClick={handleNext} aria-label="Next photo">
            &#8594;
          </button>
        </div>

        <div className="photo-caption mb-6 text-center">{currentPhoto.caption}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Vehicle details */}
          <div>
            <ul className="space-y-2">
              <li>
                <strong>Price:</strong> ${vehicle.price}
              </li>
              <li>
                <strong>Mileage:</strong> {vehicle.mileage} km
              </li>
              <li>
                <strong>VIN:</strong> {vehicle.vin}
              </li>
              <li>
                <strong>Color:</strong> {vehicle.color}
              </li>
              <li>
                <strong>Transmission:</strong> {vehicle.transmission}
              </li>
              <li>
                <strong>Body Style:</strong> {vehicle.bodystyle}
              </li>
              <li>
                <strong>Engine Cylinders:</strong> {vehicle.enginecylinders}
              </li>
              <li>
                <strong>Condition:</strong> {vehicle.condition}
              </li>
              <li>
                <strong>Listing Address:</strong> {vehicle.listingaddress}
              </li>
              <li>
                <strong>Created On:</strong> {new Date(vehicle.createdon).toLocaleString()}
              </li>
            </ul>
          </div>

          {/* Description and contact */}
          <div>
            <div className="mb-4">
              <strong>Description:</strong>
              <p className="mt-2">{vehicle.description}</p>
            </div>

            <button
              onClick={handleContactClick}
              className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {showContact ? "Hide Contact Info" : "Show Contact Info"}
            </button>

            {showContact && (
              <div className="mb-4 p-4 bg-gray-800 rounded text-white">
                <h3 className="font-bold mb-2">Seller Contact Information:</h3>
                <p>
                  <strong>Email:</strong> {vehicle.user_email}
                </p>
                <p>
                  <strong>Phone:</strong> {vehicle.user_phone}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedListingsPage;
