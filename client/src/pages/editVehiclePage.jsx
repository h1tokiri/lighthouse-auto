import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const initialState = {
  make: '',
  model: '',
  year: '',
  price: '',
  vin: '',
  mileage: '',
  color: '',
  transmission: '',
  bodystyle: '',
  enginecylinders: '',
  condition: '',
  description: '',
  listingaddress: '',
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
    fetch(`/api/vehicles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setPhotos(data.photos || []);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoDelete = async (photoId) => {
    if (!window.confirm('Delete this photo?')) return;
    await fetch(`/api/vehicles/vehiclephotos/${photoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setPhotos(photos.filter(p => p.id !== photoId));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form)
    });
    navigate('/my-vehicles');
  };

  const handleNewPhotoChange = e => {
    const files = Array.from(e.target.files);
    setNewPhotos(files);
    setNewCaptions(Array(files.length).fill(''));
  };

  const handleNewCaptionChange = (idx, value) => {
    const updated = [...newCaptions];
    updated[idx] = value;
    setNewCaptions(updated);
  };

  const handleUploadPhotos = async e => {
    e.preventDefault();
    if (newPhotos.length === 0) return;
    const formData = new FormData();
    newPhotos.forEach((photo, idx) => {
      formData.append('photos', photo);
    });
    newCaptions.forEach(caption => {
      formData.append('captions[]', caption);
    });
    const res = await fetch(`/api/vehicles/${id}/photos`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    if (typeof newCaption !== 'string') return;
    const res = await fetch(`/api/vehicles/vehiclephotos/${photoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ caption: newCaption }),
    });
    if (res.ok) {
      setPhotos(photos.map(p =>
        p.id === photoId ? { ...p, caption: newCaption } : p
      ));
      setEditingCaptions({ ...editingCaptions, [photoId]: undefined });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Vehicle not found.</div>;

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: '#2f2d2d' }}>
      <div className="create-vehicle-form max-w-4xl mx-auto p-6 rounded shadow" style={{ backgroundColor: '#0b0909', color: '#dca54c' }}>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Vehicle</h2>

        {/* Photo Thumbnails */}
        <div className="photo-thumbnails mb-6 flex justify-center">
          {photos.map((photo, idx) => (
            <div className="photo-thumb mb-4 p-4 rounded shadow" key={photo.id || idx} style={{ backgroundColor: '#0b0909', color: '#dca54c', width: 'fit-content', textAlign: 'center' }}>
              {photo.photourl && (
                <img
                  src={`http://localhost:3001/${photo.photourl}`}
                  alt={`vehicle-${idx}`}
                  style={{ width: 160, height: 120, objectFit: 'cover', borderRadius: 4, border: '1px solid #ccc', margin: '0 auto' }}
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

        <div className="mb-6">
          <label>Add More Photos:</label>
          <input type="file" multiple accept="image/*" onChange={handleNewPhotoChange} className="block mb-2" />
          {newPhotos.length > 0 && (
            <div>
              {newPhotos.map((photo, idx) => (
                <div className="photo-caption-row mb-2" key={idx}>
                  <img src={URL.createObjectURL(photo)} alt={`new-upload-${idx}`} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ccc' }} />
                  <input className="caption-input ml-2" type="text" value={newCaptions[idx] || ""} onChange={e => handleNewCaptionChange(idx, e.target.value)} placeholder="Caption" />
                </div>
              ))}
              <button type="button" className="edit-btn mt-2" onClick={handleUploadPhotos}>Upload Photos</button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label>Make:</label><input name="make" value={form.make} onChange={handleChange} required /></div>
            <div><label>Model:</label><input name="model" value={form.model} onChange={handleChange} required /></div>
            <div><label>Year:</label><input name="year" value={form.year} onChange={handleChange} required /></div>
            <div><label>Price:</label><input name="price" value={form.price} onChange={handleChange} required /></div>
            <div><label>VIN:</label><input name="vin" value={form.vin} onChange={handleChange} placeholder="Optional" /></div>
            <div><label>Mileage:</label><input name="mileage" value={form.mileage} onChange={handleChange} required /></div>
            <div><label>Color:</label><input name="color" value={form.color} onChange={handleChange} required /></div>
            <div><label>Listing Address:</label><input name="listingaddress" value={form.listingaddress} onChange={handleChange} required /></div>
            <div><label>Body Style:</label><select name="bodystyle" value={form.bodystyle} onChange={handleChange} required><option value="">Select</option><option value="Sedan">Sedan</option><option value="Coupe">Coupe</option><option value="Hatchback">Hatchback</option><option value="SUV">SUV</option><option value="Station Wagon">Station Wagon</option><option value="Convertible">Convertible</option><option value="Truck">Truck</option><option value="Van">Van</option><option value="Motorcycle">Motorcycle</option></select></div>
            <div><label>Engine Cylinders:</label><select name="enginecylinders" value={form.enginecylinders} onChange={handleChange} required><option value="">Select</option><option value="2">2</option><option value="4">4</option><option value="6">6</option><option value="8">8</option><option value="10">10</option><option value="12">12</option></select></div>
            <div><label>Condition:</label><select name="condition" value={form.condition} onChange={handleChange} required><option value="">Select</option><option value="Good">Good</option><option value="Fair">Fair</option><option value="Rough">Rough</option><option value="Does Not Run">Does Not Run</option></select></div>
            <div><label>Transmission:</label><select name="transmission" value={form.transmission} onChange={handleChange} required><option value="">Select</option><option value="Automatic">Automatic</option><option value="Manual">Manual</option></select></div>
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
