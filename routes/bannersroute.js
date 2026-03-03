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

    const { title = "", description = "", is_visible = false } = req.body;
    const imageUrl = req.file.path || req.file.url;
    const public_id = req.file.filename;

    const query = `
      INSERT INTO banner_images (image_url, public_id, title, description, is_visible)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [imageUrl, public_id, title, description, is_visible];
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
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title = "", description = "", is_visible = false } = req.body;

    // Get old banner
    const oldBanner = await pool.query(
      "SELECT public_id FROM banner_images WHERE id = $1",
      [id]
    );

    if (oldBanner.rows.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    let imageUrl = oldBanner.rows[0].image_url;
    let public_id = oldBanner.rows[0].public_id;

    // If new image uploaded, replace old one
    if (req.file) {
      await cloudinary.uploader.destroy(public_id);
      imageUrl = req.file.path;
      public_id = req.file.filename;
    }

    const updated = await pool.query(
      `UPDATE banner_images
       SET image_url = $1, public_id = $2, title = $3, description = $4, is_visible = $5
       WHERE id = $6
       RETURNING *`,
      [imageUrl, public_id, title, description, is_visible, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/toggle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT is_visible FROM banner_images WHERE id = $1",
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Banner not found" });

    const newVisibility = !rows[0].is_visible;

    const updated = await pool.query(
      "UPDATE banner_images SET is_visible = $1 WHERE id = $2 RETURNING *",
      [newVisibility, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Toggle visibility error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
