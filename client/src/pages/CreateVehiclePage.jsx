import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  make: "",
  model: "",
  year: "",
  price: "",
  vin: "",
  mileage: "",
  color: "",
  transmission: "",
  bodystyle: "",
  enginecylinders: "",
  condition: "",
  description: "",
  listingaddress: "",
};

export default function CreateVehiclePage() {
  const [form, setForm] = useState(initialState);
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

    useEffect(() => {
      document.title = "Create";
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setCaptions(Array(files.length).fill(""));
    setPhotoPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = {
      ...form,
      vin: form.vin === "" ? null : form.vin,
    };

    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });


    if (!res.ok) {
      setMessage("Failed to create vehicle.");
      return;
    }

    const vehicle = await res.json();

    if (photos.length > 0) {
      const formDataPhotos = new FormData();
      photos.forEach((photo, idx) => {
        formDataPhotos.append("photos", photo);
        formDataPhotos.append("captions[]", captions[idx] || "");
      });
      await fetch(`/api/vehicles/${vehicle.id}/photos`, {
        method: "POST",
        body: formDataPhotos,
      });
    }

    setMessage("Vehicle created successfully!");
    setForm(initialState);
    setPhotos([]);
    setCaptions([]);
    navigate("/my-vehicles");
  };

  return (
    <div className="min-h-screen bg-[#2f2d2d] py-10 px-4">
      <div
        className="create-vehicle-form p-6 rounded shadow max-w-3xl mx-auto"
        style={{ backgroundColor: "#0b0909", color: "#dca54c" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Make:</label>
              <input name="make" value={form.make} onChange={handleChange} required />
            </div>
            <div>
              <label>Model:</label>
              <input name="model" value={form.model} onChange={handleChange} required />
            </div>
            <div>
              <label>Year:</label>
              <input name="year" value={form.year} onChange={handleChange} required />
            </div>
            <div>
              <label>Price:</label>
              <input name="price" value={form.price} onChange={handleChange} required />
            </div>
            <div>
              <label>VIN:</label>
              <input name="vin" value={form.vin} onChange={handleChange} placeholder="Optional" />
            </div>
            <div>
              <label>Mileage:</label>
              <input name="mileage" value={form.mileage} onChange={handleChange} required />
            </div>
            <div>
              <label>Color:</label>
              <input name="color" value={form.color} onChange={handleChange} required />
            </div>
            <div>
              <label>Listing Address:</label>
              <input
                name="listingaddress"
                value={form.listingaddress}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Body Style:</label>
              <select name="bodystyle" value={form.bodystyle} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="SUV">SUV</option>
                <option value="Station Wagon">Station Wagon</option>
                <option value="Convertible">Convertible</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>
            <div>
              <label>Engine Cylinders:</label>
              <select
                name="enginecylinders"
                value={form.enginecylinders}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
            </div>
            <div>
              <label>Condition:</label>
              <select name="condition" value={form.condition} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Rough">Rough</option>
                <option value="Does Not Run">Does Not Run</option>
              </select>
            </div>
            <div>
              <label>Transmission:</label>
              <select
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label>Photos:</label>
            <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
          </div>

          {photos.map((photo, idx) => (
            <div key={idx} className="flex items-center mt-2 gap-2">
              {photoPreviews[idx] && (
                <img
                  src={photoPreviews[idx]}
                  alt={`preview-${idx}`}
                  style={{
                    width: 80,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              )}
              <input
                type="text"
                value={captions[idx] || ""}
                onChange={(e) => handleCaptionChange(idx, e.target.value)}
                placeholder="Caption"
              />
            </div>
          ))}

          <div className="mt-4">
            <label>Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="w-full border p-2 rounded"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-6">
            Create Vehicle
          </button>
        </form>

        {message && <p className="mt-4 text-center font-medium">{message}</p>}
      </div>
    </div>
  );
}
