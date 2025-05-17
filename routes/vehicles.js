const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if needed
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // You can configure this as needed

// Middleware to parse JSON bodies
router.use(express.json());

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

// POST /api/vehicles - create a new vehicle
router.post('/', async (req, res) => {
  try {
    console.log('Received body:', req.body); // Log the incoming data
    // TEMP: Hardcode user ID for testing
    const userid = 1; // Replace with a valid user ID from your Users table
    const {
      make, model, year, price, vin, mileage, color,
      transmission, bodystyle, enginecylinders, condition,
      description, listingaddress
    } = req.body;

    const result = await db.query(
      `INSERT INTO vehicles
        (userid, make, model, year, price, vin, mileage, color, transmission, bodystyle, enginecylinders, condition, description, listingaddress)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *`,
      [userid, make, model, year, price, vin, mileage, color, transmission, bodystyle, enginecylinders, condition, description, listingaddress]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in /api/vehicles:', err); // Log the error details
    res.status(500).json({ error: err.message });
  }
});

// POST /api/vehicles/:id/photos - upload photos for a vehicle
router.post('/:id/photos', upload.array('photos'), async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const captions = req.body.captions || [];

    const photoPromises = files.map((file, idx) => {
      return db.query(
        `INSERT INTO vehiclephotos (vehicleid, photourl, caption, isprimary)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [id, file.path, captions[idx] || '', idx === 0]
      );
    });

    const results = await Promise.all(photoPromises);
    res.status(201).json(results.map(r => r.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
