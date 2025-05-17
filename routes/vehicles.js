const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if needed

// GET /api/vehicles/:id - get a single vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleResult = await db.query('SELECT * FROM vehicles WHERE id = $1', [id]);
    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    const vehicle = vehicleResult.rows[0];

    // Fetch all photos for this vehicle
    const photosResult = await db.query('SELECT * FROM vehiclephotos WHERE vehicleid = $1', [id]);
    vehicle.photos = photosResult.rows;

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
