const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary"); // your Cloudinary config
const pool = require("../db");

const router = express.Router();

// ---------------- Cloudinary storage ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "feed";
    let allowedFormats = ["jpg", "jpeg", "png", "webp"];
    if (file.mimetype.startsWith("video/")) {
      folder = "feed/videos";
      allowedFormats = ["mp4", "mov", "avi", "webm"];
    }

    return {
      folder,
      allowed_formats: allowedFormats,
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`,
    };
  },
});

const upload = multer({ storage });

// ---------------- Add a new feed item ----------------
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { type } = req.body;
    if (!type || !["video", "image"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const fileUrl = req.file.path; // Cloudinary URL

    const query = `
      INSERT INTO feed_items (type, src)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [type, fileUrl];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Add feed item error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Get all feed items ----------------
router.get("/all", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, type, src FROM feed_items ORDER BY id ASC;"
    );
    res.json(rows);
  } catch (err) {
    console.error("Fetch feed error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete a feed item ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id FROM feed_items WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Feed item not found" });

    await pool.query("DELETE FROM feed_items WHERE id = $1", [req.params.id]);

    res.json({ message: "Feed item deleted successfully" });
  } catch (err) {
    console.error("Delete feed error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Update feed item (type or file) ----------------
router.put("/update/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const { rows } = await pool.query("SELECT * FROM feed_items WHERE id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Feed item not found" });

    let fileUrl = rows[0].src;

    if (req.file) {
      fileUrl = req.file.path;
    }

    const query = `
      UPDATE feed_items
      SET type = $1, src = $2
      WHERE id = $3
      RETURNING id, type, src;
    `;
    const values = [type || rows[0].type, fileUrl, id];
    const { rows: updatedRows } = await pool.query(query, values);

    res.json(updatedRows[0]);
  } catch (err) {
    console.error("Update feed error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
