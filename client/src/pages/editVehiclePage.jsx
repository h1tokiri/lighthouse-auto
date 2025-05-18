import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newCaptions, setNewCaptions] = useState([]);

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
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
    await fetch(`/api/vehiclephotos/${photoId}`, { method: 'DELETE' });
    setPhotos(photos.filter(p => p.id !== photoId));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
      formData.append('captions', newCaptions[idx] || '');
    });
    const res = await fetch(`/api/vehicles/${id}/photos`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const uploaded = await res.json();
      setPhotos([...photos, ...uploaded]);
      setNewPhotos([]);
      setNewCaptions([]);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Vehicle not found.</div>;

  return (
    <div className="vehicle-form-container">
      <h2>Edit Vehicle</h2>

      {/* Photos at the top */}
      <div className="photo-thumbnails">
        {photos.map(photo => (
          <div key={photo.id} className="photo-thumb">
            <img src={`http://localhost:3001/${photo.photourl}`} alt={photo.caption} width={120} />
            <div>{photo.caption}</div>
            <button type="button" className="delete-photo-btn" onClick={() => handlePhotoDelete(photo.id)}>Delete</button>
            {photo.isprimary && <span className="primary-badge">Primary</span>}
          </div>
        ))}
      </div>

      {/* Add Photos input and button go here */}
      <form onSubmit={handleUploadPhotos} style={{ marginBottom: '2rem' }}>
        <label>Add Photos:</label>
        <input type="file" multiple accept="image/*" onChange={handleNewPhotoChange} />
        {newPhotos.map((photo, idx) => (
          <div key={idx} className="photo-caption-row">
            <img
              src={URL.createObjectURL(photo)}
              alt={`Preview ${photo.name}`}
              className="photo-thumb"
              width={80}
            />
            <span>{photo.name}</span>
            <input
              type="text"
              placeholder="Caption"
              value={newCaptions[idx] || ''}
              onChange={e => handleNewCaptionChange(idx, e.target.value)}
            />
          </div>
        ))}
        {newPhotos.length > 0 && (
          <button type="submit" className="submit-btn" style={{ marginTop: '0.5rem' }}>
            Upload Photos
          </button>
        )}
      </form>

      {/* Main vehicle edit form fields below */}
      <form className="vehicle-form" onSubmit={handleSubmit}>
        {/* 2 fields per row */}
        <div className="form-row-2">
          <div>
            <label>Make</label>
            <input name="make" value={form.make} onChange={handleChange} required />
          </div>
          <div>
            <label>Model</label>
            <input name="model" value={form.model} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row-2">
          <div>
            <label>Year</label>
            <input name="year" type="number" value={form.year} onChange={handleChange} required />
          </div>
          <div>
            <label>Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row-2">
          <div>
            <label>Mileage</label>
            <input name="mileage" type="number" value={form.mileage} onChange={handleChange} required />
          </div>
          <div>
            <label>Color</label>
            <input name="color" value={form.color} onChange={handleChange} required />
          </div>
        </div>
        {/* 2 dropdowns per row */}
        <div className="form-row-2">
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
            <select name="enginecylinders" value={form.enginecylinders} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>
        <div className="form-row-2">
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
            <select name="transmission" value={form.transmission} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>
        {/* Description and Address full width */}
        <div className="form-row-2">
          <div>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </div>
          <div>
            <label>Listing Address</label>
            <input name="listingaddress" value={form.listingaddress} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVehiclePage;
