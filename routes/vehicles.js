// // routes/vehicles.js
// const express = require("express");
// const router = express.Router();
// const db = require("../db/connection");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// // 1) NEW: List 10 most recent vehicles with primary photo
// router.get("/", async (req, res) => {
//   try {
//     const { rows } = await db.query(`
//       SELECT
//         v.id,
//         v.make,
//         v.model,
//         v.price,
//         v.mileage,
//         (SELECT photourl
//            FROM vehiclephotos
//           WHERE vehicleid = v.id
//             AND isprimary = TRUE
//           LIMIT 1
//         ) AS photoUrl
//       FROM vehicles v
//       ORDER BY v.createdon DESC
//       LIMIT 10;
//     `);
//     res.json(rows);
//   } catch (err) {
//     console.error("Error in GET /api/vehicles:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2) My vehicles for current user
// // router.get("/my-vehicles", async (req, res) => {

// // const router = express.Router();
// // const db = require("../db/connection"); // Adjust path if needed
// // const multer = require("multer");
// // const upload = multer({ dest: "uploads/" }); // You can configure this as needed
// // const requireUser = require('../middleware/verifyToken'); // or your JWT middleware

// // // Middleware to parse JSON bodies
// // router.use(express.json());

// // --- Place /my-vehicles route FIRST ---
// router.get("/my-vehicles", requireUser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const vehicles = await db.query(`
//       SELECT
//         v.id,
//         v.make,
//         v.model,
//         v.year,
//         v.price,
//         /* changed alias here from primaryPhoto → photoUrl */
//         (SELECT photourl
//            FROM vehiclephotos
//           WHERE vehicleid = v.id
//             AND isprimary = TRUE
//           LIMIT 1
//         ) AS photoUrl
//       FROM vehicles v
//       WHERE v.userid = 1
//       ORDER BY v.createdon DESC;
//     `);
//     res.json(vehicles.rows);
//   } catch (err) {
//     console.error("Error in /my-vehicles:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 3) Vehicle detail (with all photos & seller info)
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vehicleResult = await db.query(
//       `
//       SELECT
//         v.*,
//         u.email       AS user_email,
//         u.phonenumber AS user_phone
//       FROM vehicles v
//       JOIN users u ON v.userid = u.id
//       WHERE v.id = $1;
//     `,
//       [id]
//     );
//     if (vehicleResult.rows.length === 0) {
//       return res.status(404).json({ error: "Vehicle not found" });
//     }
//     const vehicle = vehicleResult.rows[0];

//     const photosResult = await db.query("SELECT * FROM vehiclephotos WHERE vehicleid = $1", [id]);
//     vehicle.photos = photosResult.rows;

//     res.json(vehicle);
//   } catch (err) {
//     console.error("Error in GET /api/vehicles/:id:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 4) Create a new vehicle
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
//       make,
//       model,
//       year,
//       price,
//       vin,
//       mileage,
//       color,
//       transmission,
//       bodystyle,
//       enginecylinders,
//       condition,
//       description,
//       listingaddress,
//     } = req.body;

//     const result = await db.query(
//       `INSERT INTO vehicles
//         (userid, make, model, year, price, vin, mileage,
//          color, transmission, bodystyle, enginecylinders,
//          condition, description, listingaddress)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
//        RETURNING *;`,
//       [
//         userId,
//         make,
//         model,
//         year,
//         price,
//         vin || null,
//         mileage,
//         color,
//         transmission,
//         bodystyle,
//         enginecylinders,
//         condition,
//         description,
//         listingaddress,
//       ]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Error in POST /api/vehicles:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 5) Upload photos for a vehicle
// router.post("/:id/photos", upload.array("photos"), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const files = req.files;
//     const captions = req.body.captions || [];

//     const photoPromises = files.map((file, idx) =>
//       db.query(
//         `INSERT INTO vehiclephotos
//             (vehicleid, photourl, caption, isprimary)
//          VALUES ($1, $2, $3, $4)
//          RETURNING *;`,
//         [id, file.path, captions[idx] || "", idx === 0]
//       )
//     );

//     const results = await Promise.all(photoPromises);
//     res.status(201).json(results.map((r) => r.rows[0]));
//   } catch (err) {
//     console.error("Error in POST /api/vehicles/:id/photos:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete a photo by ID
// router.delete("/vehiclephotos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await db.query("DELETE FROM vehiclephotos WHERE id = $1", [id]);
//     res.sendStatus(204);
//   } catch (err) {
//     console.error("Error deleting photo:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update vehicle for user 1
// router.put("/:id", requireUser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const vehicleId = req.params.id;
//     const {
//       make,
//       model,
//       year,
//       price,
//       vin,
//       mileage,
//       color,
//       transmission,
//       bodystyle,
//       enginecylinders,
//       condition,
//       description,
//       listingaddress,
//     } = req.body;

//     // Only allow update if the vehicle belongs to the user
//     const { rows } = await db.query("SELECT * FROM vehicles WHERE id = $1 AND userid = $2", [
//       vehicleId,
//       userId,
//     ]);
//     if (rows.length === 0) {
//       return res.status(403).json({ error: "Not authorized" });
//     }

//     // Update all fields
//     await db.query(
//       `UPDATE vehicles SET
//         make = $1, model = $2, year = $3, price = $4, vin = $5, mileage = $6, color = $7,
//         transmission = $8, bodystyle = $9, enginecylinders = $10, condition = $11,
//         description = $12, listingaddress = $13
//       WHERE id = $14 AND userid = $15`,
//       [
//         make,
//         model,
//         year,
//         price,
//         vin,
//         mileage,
//         color,
//         transmission,
//         bodystyle,
//         enginecylinders,
//         condition,
//         description,
//         listingaddress,
//         vehicleId,
//         userId,
//       ]
//     );

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update photo caption by ID
// router.put("/vehiclephotos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { caption } = req.body;
//     await db.query("UPDATE vehiclephotos SET caption = $1 WHERE id = $2", [caption, id]);
//     res.sendStatus(204);
//   } catch (err) {
//     console.error("Error updating caption:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Set a photo as primary for a vehicle
// router.put("/api/vehicles/:vehicleId/photos/:photoId/primary", async (req, res) => {
//   const { vehicleId, photoId } = req.params;
//   try {
//     // Set all photos for this vehicle to not primary
//     await db.query("UPDATE VehiclePhotos SET IsPrimary = FALSE WHERE VehicleID = $1", [vehicleId]);
//     // Set the selected photo to primary
//     await db.query("UPDATE VehiclePhotos SET IsPrimary = TRUE WHERE ID = $1 AND VehicleID = $2", [
//       photoId,
//       vehicleId,
//     ]);
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// routes/vehicles.js
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
router.get("/my-vehicles", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const vehicles = await db.query(`
      SELECT
        v.id, v.make, v.model, v.year, v.price,
        (SELECT photourl
         FROM vehiclephotos
         WHERE vehicleid = v.id AND isprimary = TRUE
         LIMIT 1) AS photourl
      FROM vehicles v
      WHERE v.userid = $1
      ORDER BY v.createdon DESC;
    `, [userId]);

    res.json(vehicles.rows);
  } catch (err) {
    console.error("Error in /my-vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});


// Tiago - Beginning
router.get('/search', async (req, res) => {
  try {
    const {
      make, model, postalCode,
      minPrice, maxPrice,
      minYear, maxYear,
      minMileage, maxMileage,
      transmission, bodystyle, condition
    } = req.query;

    let query = `
      SELECT v.*,
        (SELECT json_agg(p.*)
         FROM vehiclephotos p
         WHERE p.vehicleid = v.id) as photos
      FROM vehicles v
      WHERE 1=1
    `;
    const params = [];

    if (make) {
      params.push(make);
      query += ` AND LOWER(v.make) = LOWER($${params.length})`;
    }

    if (model) {
      params.push(model);
      query += ` AND LOWER(v.model) = LOWER($${params.length})`;
    }

    if (minPrice) {
      params.push(minPrice);
      query += ` AND v.price >= $${params.length}`;
    }

    if (maxPrice) {
      params.push(maxPrice);
      query += ` AND v.price <= $${params.length}`;
    }

    if (minYear) {
      params.push(minYear);
      query += ` AND v.year >= $${params.length}`;
    }

    if (maxYear) {
      params.push(maxYear);
      query += ` AND v.year <= $${params.length}`;
    }

    if (minMileage) {
      params.push(minMileage);
      query += ` AND v.mileage >= $${params.length}`;
    }

    if (maxMileage) {
      params.push(maxMileage);
      query += ` AND v.mileage <= $${params.length}`;
    }

    if (transmission) {
      params.push(transmission);
      query += ` AND LOWER(v.transmission) = LOWER($${params.length})`;
    }

    if (bodystyle) {
      params.push(bodystyle);
      query += ` AND LOWER(v.bodystyle) = LOWER($${params.length})`;
    }

    if (condition) {
      params.push(condition);
      query += ` AND LOWER(v.condition) = LOWER($${params.length})`;
    }

    if (postalCode && postalCode.trim()) {
      params.push(`%${postalCode}%`);
      query += ` AND v.listingaddress LIKE $${params.length}`;
    }

    query += ' ORDER BY v.createdon DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
       SELECT DISTINCT make
       FROM vehicles
       ORDER BY make ASC;    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching makes:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/models', async (req, res) => {
  try {
    const { make } = req.query;
    if (!make) {
      return res.json([]);
    }

    const result = await db.query(`
      SELECT DISTINCT model
      FROM vehicles
      WHERE LOWER(make) = LOWER($1)
      ORDER BY model ASC;
    `, [make]);
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching models:', err);
    res.status(500).json({ error: err.message });
  }
});
// Tiago - End

// GET /api/vehicles/:id - get a single vehicle by ID
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
    const userid = 1; // hardcoded for now
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
        (userid, make, model, year, price, vin, mileage,
         color, transmission, bodystyle, enginecylinders,
         condition, description, listingaddress)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *;`,
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

// (You can leave your DELETE / PUT etc. here as is)

module.exports = router;
