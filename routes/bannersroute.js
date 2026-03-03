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
    // No public_id needed
  },
});

// Multer setup
const upload = multer({ storage });

// ---------------- Upload a new banner ----------------
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const {
      title = "",
      description = "",
      title_visible = false,
      description_visible = false,
    } = req.body;

    const imageUrl = req.file.path || req.file.url;

    const query = `
      INSERT INTO banner_images (image_url, title, description, title_visible, description_visible)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [imageUrl, title, description, title_visible, description_visible];

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

    await pool.query("DELETE FROM banner_images WHERE id = $1", [req.params.id]);

    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Delete banner error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Update banner ----------------
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title = "",
      description = "",
      title_visible = false,
      description_visible = false,
    } = req.body;

    // Get old banner
    const oldBanner = await pool.query(
      "SELECT image_url FROM banner_images WHERE id = $1",
      [id]
    );

    if (oldBanner.rows.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    let imageUrl = oldBanner.rows[0].image_url;

    // Replace image if new uploaded
    if (req.file) {
      imageUrl = req.file.path;
    }

    const updated = await pool.query(
      `UPDATE banner_images
       SET image_url = $1,
           title = $2,
           description = $3,
           title_visible = $4,
           description_visible = $5
       WHERE id = $6
       RETURNING *`,
      [imageUrl, title, description, title_visible, description_visible, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Toggle title visibility
router.put("/toggle/title/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT title_visible FROM banner_images WHERE id = $1",
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Banner not found" });

    const newVisibility = !rows[0].title_visible;
    const updated = await pool.query(
      "UPDATE banner_images SET title_visible = $1 WHERE id = $2 RETURNING *",
      [newVisibility, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Toggle title visibility error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Toggle description visibility
router.put("/toggle/description/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT description_visible FROM banner_images WHERE id = $1",
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Banner not found" });

    const newVisibility = !rows[0].description_visible;
    const updated = await pool.query(
      "UPDATE banner_images SET description_visible = $1 WHERE id = $2 RETURNING *",
      [newVisibility, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Toggle description visibility error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;