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
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = e => {
    setPhotos([...e.target.files]);
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

    // 2. Upload photos if any
    if (photos.length > 0) {
      const formData = new FormData();
      photos.forEach(photo => formData.append('photos', photo));
      await fetch(`/api/vehicles/${vehicle.id}/photos`, {
        method: 'POST',
        body: formData,
      });
    }
    setMessage('Vehicle created successfully!');
    setForm(initialState);
    setPhotos([]);
  };

  return (
    <div className="create-vehicle-form">
      <h2>Create New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialState).map(key => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              name={key}
              value={form[key]}
              onChange={handleChange}
              required={key !== 'description' && key !== 'listingaddress'}
            />
          </div>
        ))}
        <div>
          <label>Photos:</label>
          <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Create Vehicle</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
