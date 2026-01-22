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
    folder: "activities",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => {
      const nameWithoutExt = path.parse(file.originalname).name;
      return `${Date.now()}-${nameWithoutExt}`;
    },
  },
});

const upload = multer({ storage });

// ---------------- Add new activity ----------------
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { path: image_url } = req.file; // only URL, no public_id

    const query = `
      INSERT INTO activities (title, subtitle, image_url, link)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [title, subtitle, image_url, link];
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
    console.error("Fetch activities error:", err);
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

    // We no longer delete from Cloudinary

    await pool.query("DELETE FROM activities WHERE id = $1", [req.params.id]);
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    console.error("Delete activity error:", err);
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

    if (req.file) {
      image_url = req.file.path; // just replace URL
    }

    const updateQuery = `
      UPDATE activities
      SET title=$1, subtitle=$2, link=$3, image_url=$4
      WHERE id=$5
      RETURNING *;
    `;
    const values = [
      title || activity.title,
      subtitle || activity.subtitle,
      link || activity.link,
      image_url,
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
