import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

export default function EditVehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newCaptions, setNewCaptions] = useState([]);
  const [editingCaptions, setEditingCaptions] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Edit";
  }, []);

  useEffect(() => {
    fetch(`https://lighthouse-auto.onrender.com/api/vehicles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setPhotos(data.photos || []);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoDelete = async (photoId) => {
    if (!window.confirm("Delete this photo?")) return;
    await fetch(`https://lighthouse-auto.onrender.com/api/vehicles/vehiclephotos/${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPhotos(photos.filter((p) => p.id !== photoId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://lighthouse-auto.onrender.com/api/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });
    navigate("/my-vehicles");
  };

  const handleNewPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setNewPhotos(files);
    setNewCaptions(Array(files.length).fill(""));
  };

  const handleNewCaptionChange = (idx, value) => {
    const updated = [...newCaptions];
    updated[idx] = value;
    setNewCaptions(updated);
  };

  const handleUploadPhotos = async (e) => {
    e.preventDefault();
    if (newPhotos.length === 0) return;
    const formData = new FormData();
    newPhotos.forEach((photo, idx) => {
      formData.append("photos", photo);
    });
    newCaptions.forEach((caption) => {
      formData.append("captions[]", caption);
    });
    const res = await fetch(`https://lighthouse-auto.onrender.com/api/vehicles/${id}/photos`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      const uploaded = await res.json();
      setPhotos([...photos, ...uploaded]);
      setNewPhotos([]);
      setNewCaptions([]);
    }
  };

  const handleCaptionChange = (photoId, value) => {
    setEditingCaptions({ ...editingCaptions, [photoId]: value });
  };

  const handleUpdateCaption = async (photoId) => {
    const newCaption = editingCaptions[photoId];
    if (typeof newCaption !== "string") return;
    const res = await fetch(
      `https://lighthouse-auto.onrender.com/api/vehicles/vehiclephotos/${photoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ caption: newCaption }),
      }
    );
    if (res.ok) {
      setPhotos(photos.map((p) => (p.id === photoId ? { ...p, caption: newCaption } : p)));
      setEditingCaptions({ ...editingCaptions, [photoId]: undefined });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Vehicle not found.</div>;

  return (
    <div className="create-vehicle-form">
      <h2>Edit Vehicle</h2>

      {/* Photo Thumbnails */}
      <div className="photo-thumbnails">
        {photos.map((photo, idx) => (
          <div className="photo-thumb" key={photo.id || idx}>
            {photo.photourl && (
              <img
                src={`http://lighthouse-auto.onrender.com/${photo.photourl}`}
                alt={`vehicle-${idx}`}
                style={{
                  width: 160,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
            )}
            {photo.isprimary && <span className="primary-badge">Primary</span>}
            <input
              className="caption-input"
              type="text"
              value={
                editingCaptions[photo.id] !== undefined
                  ? editingCaptions[photo.id]
                  : photo.caption || ""
              }
              onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
              style={{ marginTop: 4, marginBottom: 4 }}
            />
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: 4 }}>
              <button
                type="button"
                className="edit-btn"
                style={{ padding: "0.25rem 0.75rem", fontSize: "0.85rem" }}
                onClick={() => handleUpdateCaption(photo.id)}
              >
                Update Caption
              </button>
              <button
                type="button"
                className="delete-photo-btn"
                style={{ padding: "0.25rem 0.75rem", fontSize: "0.85rem" }}
                onClick={() => handlePhotoDelete(photo.id)}
              >
                Delete Photo
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <label>Add More Photos:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleNewPhotoChange}
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        {newPhotos.length > 0 && (
          <div>
            {newPhotos.map((photo, idx) => (
              <div className="photo-caption-row" key={idx}>
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`new-upload-${idx}`}
                  style={{
                    width: 80,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  className="caption-input"
                  type="text"
                  value={newCaptions[idx] || ""}
                  onChange={(e) => handleNewCaptionChange(idx, e.target.value)}
                  placeholder="Caption"
                  style={{ marginLeft: 8 }}
                />
              )}
              {photo.isprimary && <span className="primary-badge block text-xs mt-1 text-center">Primary</span>}
              <input
                className="caption-input mt-2 mb-2 p-1 rounded w-full"
                type="text"
                value={editingCaptions[photo.id] !== undefined ? editingCaptions[photo.id] : photo.caption || ""}
                onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
                style={{ backgroundColor: '#1a1a1a', color: '#f5f5f5', border: '1px solid #444' }}
              />
              <div className="flex justify-center gap-2">
                <button type="button" className="btn btn-sm btn-primary" onClick={() => handleUpdateCaption(photo.id)}>Update Caption</button>
                <button type="button" className="btn btn-sm btn-error text-white" onClick={() => handlePhotoDelete(photo.id)}>Delete Photo</button>
              </div>
            </div>
          ))}
        </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
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
          <div className="mt-4">
            <label>Description:</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="btn btn-primary mt-6">Update Vehicle</button>
        </form>
      </div>
    </div>
  );
}
