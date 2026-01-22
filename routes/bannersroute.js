const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../cloudinary");
const pool = require('../db');

const router = express.Router();


// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload a new banner
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: "banners" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        // Insert into PostgreSQL
        const query = `
          INSERT INTO banner_images (url, public_id)
          VALUES ($1, $2)
          RETURNING *;
        `;
        const values = [result.secure_url, result.public_id];
        const { rows } = await pool.query(query, values);

        res.status(201).json(rows[0]);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all banners
router.get("/all", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM banner_images ORDER BY created_at DESC;"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a banner by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM banner_images WHERE id = $1",
      [req.params.id]
    );
    const banner = rows[0];

    if (!banner) return res.status(404).json({ error: "Banner not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(banner.public_id);

    // Delete from PostgreSQL
    await pool.query("DELETE FROM banner_images WHERE id = $1", [req.params.id]);

    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
