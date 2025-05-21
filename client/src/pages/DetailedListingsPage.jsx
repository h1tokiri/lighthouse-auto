import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailedListingsPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false); // Tiago

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!vehicle) return <div>Vehicle not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{vehicle.make} {vehicle.model} ({vehicle.year})</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <ul className="space-y-2">
            <li><strong>Price:</strong> ${vehicle.price}</li>
            <li><strong>Mileage:</strong> {vehicle.mileage} km</li>
            <li><strong>VIN:</strong> {vehicle.vin}</li>
            <li><strong>Color:</strong> {vehicle.color}</li>
            <li><strong>Transmission:</strong> {vehicle.transmission}</li>
            <li><strong>Body Style:</strong> {vehicle.bodystyle}</li>
            <li><strong>Engine Cylinders:</strong> {vehicle.enginecylinders}</li>
            <li><strong>Condition:</strong> {vehicle.condition}</li>
            <li><strong>Listing Address:</strong> {vehicle.listingaddress}</li>
            <li><strong>Created On:</strong> {new Date(vehicle.createdon).toLocaleString()}</li>
          </ul>
        </div>
        <div>
          <strong>Description:</strong>
          <p className="mt-2">{vehicle.description}</p>
          {/* Tiago - Beginning
          Add contact button near the top */}
          <div>
            <button
            onClick={() => setShowContact(!showContact)}
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
            {showContact ? 'Hide Contact Info' : 'Show Contact Info'}
            </button>

            {/* Add contact info section*/}
            {showContact && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Seller Contact Information:</h3>
                    <p><strong>Email:</strong> {vehicle.user_email}</p>
                    <p><strong>Phone:</strong> {vehicle.user_phone}</p>
                  </div>
                )}
          </div>
          {/* Tiago - End*/}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Photos</h2>
        <div className="flex flex-wrap gap-4">
          {(vehicle.photos && vehicle.photos.length > 0) ? (
            vehicle.photos.map((photo, idx) => (
              <div key={photo.id || idx} className="w-40 h-28 bg-gray-200 flex items-center justify-center rounded overflow-hidden">
                {/* Placeholder image */}
                <img
                  src="https://via.placeholder.com/150x100?text=Vehicle+Photo"
                  alt={photo.caption || `Vehicle photo ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))
          ) : (
            <div className="text-gray-500">No photos available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedListingsPage;
