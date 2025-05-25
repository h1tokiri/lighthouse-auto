import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/vehicles/my-vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  return (
    <div>
      <h2>My Vehicles</h2>
      <div className="vehicle-cards">
        {Array.isArray(vehicles) && vehicles.length > 0 ? (
          vehicles.map((v) => (
            <div
              className="vehicle-card"
              key={v.id}
              onClick={(e) => {
                // Prevent navigation if Edit or Delete is clicked
                if (
                  e.target.closest(".edit-btn") ||
                  e.target.closest(".delete-btn")
                ) {
                  return;
                }
                navigate(`/vehicles/${v.id}`);
              }}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/vehicles/${v.id}`);
              }}
            >
              <img
                src={
                  v.photourl
                    ? `http://localhost:3001/${v.photourl}`
                    : "https://via.placeholder.com/200x120?text=No+Photo"
                }
                alt={`${v.make} ${v.model}`}
                className="vehicle-card-photo"
              />
              <div className="vehicle-card-info">
                <h3>
                  {v.year} {v.make} {v.model}
                </h3>
                <p className="vehicle-card-price">${v.price}</p>
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/vehicles/edit/${v.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(v.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No vehicles found or error loading vehicles.</p>
        )}
      </div>
    </div>
  );
};

export default MyVehiclesPage;
