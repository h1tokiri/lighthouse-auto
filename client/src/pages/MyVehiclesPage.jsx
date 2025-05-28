import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Vehicles";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Get stored JWT

    if (!token) {
      setError("You must be logged in to view your vehicles.");
      return;
    }

    fetch("/api/vehicles/my-vehicles", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token in header
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or error fetching vehicles.");
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch((err) => {
        console.error("Vehicle fetch failed:", err);
        setError("Failed to load your vehicles. Please login again.");
        setVehicles([]);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    const token = localStorage.getItem("token");

    await fetch(`/api/vehicles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Include token here too
      },
    });

    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="pt-24 px-4 min-h-screen" style={{ backgroundColor: "#2f2d2d" }}>
      <h2 className="text-3xl font-bold text-white mb-6">My Vehicles</h2>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="vehicle-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(vehicles) && vehicles.length > 0 ? (
          vehicles.map((v) => (
            <div
              className="vehicle-card rounded-lg shadow-md overflow-hidden"
              key={v.id}
              onClick={(e) => {
                if (
                  e.target.closest(".edit-btn") ||
                  e.target.closest(".delete-btn")
                ) return;
                navigate(`/vehicles/${v.id}`);
              }}
              style={{
                cursor: "pointer",
                backgroundColor: "#0b0909",
                color: "#dca54c",
              }}
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
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">
                  {v.year} {v.make} {v.model}
                </h3>
                <p className="vehicle-card-price mb-3 font-semibold">${v.price}</p>
                <div className="flex justify-between">
                  <button
                    className="edit-btn btn btn-sm btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/vehicles/edit/${v.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn btn btn-sm btn-error text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(v.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : !error ? (
          <p className="text-white">No vehicles found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default MyVehiclesPage;
