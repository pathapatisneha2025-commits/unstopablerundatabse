const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");
const pool = require("../db");
const path = require("path");

const router = express.Router();

// ---------------- Cloudinary storage ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => {
      const nameWithoutExt = path.parse(file.originalname).name;
      return `${Date.now()}-${nameWithoutExt}`;
    },
  },
});

// Multer setup
const upload = multer({ storage });

// ---------------- Upload a new banner ----------------
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = req.file.path || req.file.url; // fallback if path is undefined

    const query = `
      INSERT INTO banner_images (image_url)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [imageUrl];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ---------------- Get all banners ----------------
router.get("/all", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM banner_images ORDER BY created_at DESC;"
    );
    res.json(rows);
  } catch (err) {
    console.error("Fetch banners error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete a banner by ID ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM banner_images WHERE id = $1",
      [req.params.id]
    );
    const banner = rows[0];

    if (!banner) return res.status(404).json({ error: "Banner not found" });

    // Can't delete from Cloudinary because we don't store public_id
    // Only delete from PostgreSQL
    await pool.query("DELETE FROM banner_images WHERE id = $1", [req.params.id]);

    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Delete banner error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
