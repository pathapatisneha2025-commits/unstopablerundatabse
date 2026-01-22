const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");
const pool = require("../db");
const path = require("path");

const router = express.Router();

// ---------------- Cloudinary storage for activities ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "activities",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => {
      const nameWithoutExt = path.parse(file.originalname).name;
      return `${Date.now()}-${nameWithoutExt}`;
    },
  },
});

// Multer setup
const upload = multer({ storage });

// ---------------- Add new activity ----------------
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { path: image_url, filename: public_id } = req.file;

    const query = `
      INSERT INTO activities (title, subtitle, image_url, link, public_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [title, subtitle, image_url, link, public_id];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Add activity error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Get all activities ----------------
router.get("/all", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM activities ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete activity ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM activities WHERE id = $1",
      [req.params.id]
    );
    const activity = rows[0];
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    // Delete from Cloudinary
    if (activity.public_id) await cloudinary.uploader.destroy(activity.public_id);

    await pool.query("DELETE FROM activities WHERE id = $1", [req.params.id]);
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Update activity ----------------
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link } = req.body;

    const { rows } = await pool.query("SELECT * FROM activities WHERE id = $1", [id]);
    const activity = rows[0];
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    let image_url = activity.image_url;
    let public_id = activity.public_id;

    if (req.file) {
      // Delete old image from Cloudinary
      if (activity.public_id) await cloudinary.uploader.destroy(activity.public_id);

      image_url = req.file.path;
      public_id = req.file.filename;
    }

    const updateQuery = `
      UPDATE activities
      SET title=$1, subtitle=$2, link=$3, image_url=$4, public_id=$5
      WHERE id=$6
      RETURNING *;
    `;
    const values = [
      title || activity.title,
      subtitle || activity.subtitle,
      link || activity.link,
      image_url,
      public_id,
      id,
    ];

    const { rows: updatedRows } = await pool.query(updateQuery, values);
    res.json(updatedRows[0]);
  } catch (err) {
    console.error("Update activity error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
