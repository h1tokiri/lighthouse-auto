// routes/vehicles.js
const express = require("express");
const router  = express.Router();
const db      = require("../db/connection");
const multer  = require("multer");
const upload  = multer({ dest: "uploads/" });

// 1) NEW: List 10 most recent vehicles with primary photo
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT
        v.id,
        v.make,
        v.model,
        v.price,
        v.mileage,
        (SELECT photourl
           FROM vehiclephotos
          WHERE vehicleid = v.id
            AND isprimary = TRUE
          LIMIT 1
        ) AS photoUrl
      FROM vehicles v
      ORDER BY v.createdon DESC
      LIMIT 10;
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error in GET /api/vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2) My vehicles for current user
router.get("/my-vehicles", async (req, res) => {
const router = express.Router();
const db = require("../db/connection"); // Adjust path if needed
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // You can configure this as needed
const requireUser = require('../middleware/verifyToken'); // or your JWT middleware

// Middleware to parse JSON bodies
router.use(express.json());

// --- Place /my-vehicles route FIRST ---
router.get("/my-vehicles", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicles = await db.query(`
      SELECT
        v.id,
        v.make,
        v.model,
        v.year,
        v.price,
        /* changed alias here from primaryPhoto → photoUrl */
        (SELECT photourl
           FROM vehiclephotos
          WHERE vehicleid = v.id
            AND isprimary = TRUE
          LIMIT 1
        ) AS photoUrl
      FROM vehicles v
      WHERE v.userid = 1
      ORDER BY v.createdon DESC;
    `);
    res.json(vehicles.rows);
  } catch (err) {
    console.error("Error in /my-vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3) Vehicle detail (with all photos & seller info)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleResult = await db.query(
      `
      SELECT
        v.*,
        u.email       AS user_email,
        u.phonenumber AS user_phone
      FROM vehicles v
      JOIN users u ON v.userid = u.id
      WHERE v.id = $1;
    `,
      [id]
    );
    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    const vehicle = vehicleResult.rows[0];

    const photosResult = await db.query(
      "SELECT * FROM vehiclephotos WHERE vehicleid = $1",
      [id]
    );
    vehicle.photos = photosResult.rows;

    res.json(vehicle);
  } catch (err) {
    console.error("Error in GET /api/vehicles/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4) Create a new vehicle
router.post("/", async (req, res) => {
  try {
    const userid = 1; // hardcoded for now
    const {
      make, model, year, price, vin, mileage,
      color, transmission, bodystyle, enginecylinders,
      condition, description, listingaddress
      } = req.body;
// POST /api/vehicles - create a new vehicle
router.post("/", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      make, model, year, price, vin, mileage, color,
      transmission, bodystyle, enginecylinders, condition,
      description, listingaddress
    } = req.body;

    const result = await db.query(
      `INSERT INTO vehicles
        (userid, make, model, year, price, vin, mileage,
         color, transmission, bodystyle, enginecylinders,
         condition, description, listingaddress)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *;`,
      [
        userid, make, model, year, price, vin, mileage,
        color, transmission, bodystyle, enginecylinders,
        condition, description, listingaddress
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in POST /api/vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});

// 5) Upload photos for a vehicle
router.post("/:id/photos", upload.array("photos"), async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const captions = req.body.captions || [];

    const photoPromises = files.map((file, idx) =>
      db.query(
        `INSERT INTO vehiclephotos
            (vehicleid, photourl, caption, isprimary)
         VALUES ($1, $2, $3, $4)
         RETURNING *;`,
        [id, file.path, captions[idx] || "", idx === 0]
      )
    );


    const results = await Promise.all(photoPromises);
    res.status(201).json(results.map(r => r.rows[0]));
  } catch (err) {
    console.error("Error in POST /api/vehicles/:id/photos:", err);
    res.status(500).json({ error: err.message });
  }
});


// Delete a photo by ID
router.delete("/vehiclephotos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM vehiclephotos WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update vehicle for user 1
router.put("/:id", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleId = req.params.id;
    const {
      make, model, year, price, vin, mileage, color,
      transmission, bodystyle, enginecylinders, condition,
      description, listingaddress
    } = req.body;

    // Only allow update if the vehicle belongs to the user
    const { rows } = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND userid = $2",
      [vehicleId, userId]
    );
    if (rows.length === 0) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Update all fields
    await db.query(
      `UPDATE vehicles SET
        make = $1, model = $2, year = $3, price = $4, vin = $5, mileage = $6, color = $7,
        transmission = $8, bodystyle = $9, enginecylinders = $10, condition = $11,
        description = $12, listingaddress = $13
      WHERE id = $14 AND userid = $15`,
      [
        make, model, year, price, vin, mileage, color,
        transmission, bodystyle, enginecylinders, condition,
        description, listingaddress, vehicleId, userId
      ]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update photo caption by ID
router.put("/vehiclephotos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;
    await db.query("UPDATE vehiclephotos SET caption = $1 WHERE id = $2", [caption, id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error updating caption:", err);
    res.status(500).json({ error: err.message });
  }
});

// Set a photo as primary for a vehicle
router.put('/api/vehicles/:vehicleId/photos/:photoId/primary', async (req, res) => {
  const { vehicleId, photoId } = req.params;
  try {
    // Set all photos for this vehicle to not primary
    await db.query(
      'UPDATE VehiclePhotos SET IsPrimary = FALSE WHERE VehicleID = $1',
      [vehicleId]
    );
    // Set the selected photo to primary
    await db.query(
      'UPDATE VehiclePhotos SET IsPrimary = TRUE WHERE ID = $1 AND VehicleID = $2',
      [photoId, vehicleId]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
