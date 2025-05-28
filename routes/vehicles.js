const verifyToken = require("../middleware/verifyToken");
const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const verifyToken = require("../middleware/verifyToken");


// 1) NEW: List 10 most recent vehicles with primary photo
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT
        v.id, v.make, v.model, v.price, v.mileage,
        (SELECT photourl FROM vehiclephotos WHERE vehicleid = v.id AND isprimary = TRUE LIMIT 1) AS photoUrl
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
router.get("/my-vehicles", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicles = await db.query(
      `
      SELECT v.id, v.make, v.model, v.year, v.price,
        (SELECT photourl FROM vehiclephotos WHERE vehicleid = v.id AND isprimary = TRUE LIMIT 1) AS photourl
      FROM vehicles v
      WHERE v.userid = $1
      ORDER BY v.createdon DESC;
    `,
      [userId]
    );
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
      SELECT v.*, u.email AS user_email, u.phonenumber AS user_phone
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

    const photosResult = await db.query("SELECT * FROM vehiclephotos WHERE vehicleid = $1", [id]);
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
    const userid = 1; // Hardcoded for now
    const {
      make, model, year, price, vin, mileage, color, transmission,
      bodystyle, enginecylinders, condition, description, listingaddress,
    } = req.body;

    const result = await db.query(
      `INSERT INTO vehicles
        (userid, make, model, year, price, vin, mileage, color,
         transmission, bodystyle, enginecylinders, condition,
         description, listingaddress)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *;`,
      [
        userid, make, model, year, price, vin, mileage, color,
        transmission, bodystyle, enginecylinders, condition,
        description, listingaddress,
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
    res.status(201).json(results.map((r) => r.rows[0]));
  } catch (err) {
    console.error("Error in POST /api/vehicles/:id/photos:", err);
    res.status(500).json({ error: err.message });
  }
});

// 6) FIXED DELETE: Remove vehicle and its associated photos
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete related photos first
    await db.query("DELETE FROM vehiclephotos WHERE vehicleid = $1", [id]);

    // Now delete the vehicle itself
    const result = await db.query("DELETE FROM vehicles WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vehicle not found or already deleted." });
    }

    res.json({ message: "Vehicle and associated photos deleted successfully." });
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    res.status(500).json({ error: "Failed to delete vehicle." });
  }
});

module.exports = router;
