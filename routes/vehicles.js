const express = require("express");
const router = express.Router();
const db = require("../db/connection"); // Adjust path if needed
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // You can configure this as needed

// Middleware to parse JSON bodies
router.use(express.json());

// Middleware to get user ID (replace with your auth logic)
function requireUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}

// --- Place /my-vehicles route FIRST ---
router.get("/my-vehicles", async (req, res) => {
  console.log("--- /my-vehicles route hit ---");
  try {
    const vehicles = await db.query(`
      SELECT v.id, v.make, v.model, v.year, v.price,
        (SELECT photourl FROM vehiclephotos WHERE vehicleid = v.id AND isprimary = TRUE LIMIT 1) AS "primaryPhoto"
      FROM vehicles v
      WHERE v.userid = 1
      ORDER BY v.createdon DESC
    `);
    res.json(vehicles.rows);
  } catch (err) {
    console.error("Error in /my-vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/vehicles/:id - get a single vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleResult = await db.query(
      //  Tiago - Beginning
      // 'SELECT * FROM vehicles WHERE id = $1'
      `
      SELECT
        v.*,
        u.email as user_email,
        u.phonenumber as user_phone
      FROM vehicles v
      JOIN users u ON v.userid = u.id
      WHERE v.id = $1
    `,
      // Tiago - End
      [id]
    );
    // const vehicleResult = await db.query("SELECT * FROM vehicles WHERE id = $1", [id]);
    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    const vehicle = vehicleResult.rows[0];

    // Fetch all photos for this vehicle
    const photosResult = await db.query("SELECT * FROM vehiclephotos WHERE vehicleid = $1", [id]);
    vehicle.photos = photosResult.rows;

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/vehicles - create a new vehicle
router.post("/", async (req, res) => {
  try {
    console.log("Received body:", req.body);
    const userid = 1; // Hardcoded for now
    const {
      make,
      model,
      year,
      price,
      vin,
      mileage,
      color,
      transmission,
      bodystyle,
      enginecylinders,
      condition,
      description,
      listingaddress,
    } = req.body;

    const result = await db.query(
      `INSERT INTO vehicles
        (userid, make, model, year, price, vin, mileage, color, transmission, bodystyle, enginecylinders, condition, description, listingaddress)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *`,
      [
        userid,
        make,
        model,
        year,
        price,
        vin,
        mileage,
        color,
        transmission,
        bodystyle,
        enginecylinders,
        condition,
        description,
        listingaddress,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in /api/vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/vehicles/:id/photos - upload photos for a vehicle
router.post("/:id/photos", upload.array("photos"), async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const captions = req.body.captions || [];

    const photoPromises = files.map((file, idx) => {
      return db.query(
        `INSERT INTO vehiclephotos (vehicleid, photourl, caption, isprimary)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [id, file.path, captions[idx] || "", idx === 0]
      );
    });

    const results = await Promise.all(photoPromises);
    res.status(201).json(results.map((r) => r.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a vehicle
router.delete("/:id", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    await db.query("DELETE FROM vehicles WHERE id = $1 AND userid = $2", [id, userId]);
    res.sendStatus(204);
  } catch (err) {
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      make,
      model,
      year,
      price,
      mileage,
      color,
      transmission,
      bodystyle,
      enginecylinders,
      condition,
      description,
      listingaddress,
    } = req.body;
    await db.query(
      `UPDATE vehicles SET
        make = $1, model = $2, year = $3, price = $4, mileage = $5, color = $6,
        transmission = $7, bodystyle = $8, enginecylinders = $9,
        condition = $10, description = $11, listingaddress = $12
      WHERE id = $13 AND userid = 1`,
      [
        make,
        model,
        year,
        price,
        mileage,
        color,
        transmission,
        bodystyle,
        enginecylinders,
        condition,
        description,
        listingaddress,
        id,
      ]
    );
    res.sendStatus(204);
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

module.exports = router;
