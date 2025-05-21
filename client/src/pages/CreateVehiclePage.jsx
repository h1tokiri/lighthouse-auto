import React, { useState } from 'react';

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

export default function CreateVehiclePage() {
  const [form, setForm] = useState(initialState);
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = e => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setCaptions(Array(files.length).fill(''));
  };

  const handleCaptionChange = (idx, value) => {
    const newCaptions = [...captions];
    newCaptions[idx] = value;
    setCaptions(newCaptions);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    // 1. Create vehicle
    const res = await fetch('/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setMessage('Failed to create vehicle.');
      return;
    }
    const vehicle = await res.json();

    // 2. Upload photos with captions
    if (photos.length > 0) {
      const formData = new FormData();
      photos.forEach((photo, idx) => {
        formData.append('photos', photo);
        formData.append('captions', captions[idx] || '');
      });
      await fetch(`/api/vehicles/${vehicle.id}/photos`, {
        method: 'POST',
        body: formData,
      });
    }
    setMessage('Vehicle created successfully!');
    setForm(initialState);
    setPhotos([]);
    setCaptions([]);
  };

  return (
    <div className="create-vehicle-form">
      <h2>Create New Vehicle</h2>
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
            <input name="vin" value={form.vin} onChange={handleChange} />
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
            <input name="listingaddress" value={form.listingaddress} onChange={handleChange} required />
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
        <div>
          <label>Photos:</label>
          <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
        </div>
        {photos.map((photo, idx) => (
          <div key={idx} className="photo-caption-row">
            <img
              src={URL.createObjectURL(photo)}
              alt={`Preview ${photo.name}`}
              className="photo-thumb"
              style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
            />
            <span>{photo.name}</span>
            <input
              type="text"
              placeholder="Caption"
              value={captions[idx] || ''}
              onChange={e => handleCaptionChange(idx, e.target.value)}
              style={{ width: 120, marginLeft: 8 }}
            />
          </div>
        ))}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            className="description-textarea"
          />
        </div>
        <button type="submit">Create Vehicle</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
