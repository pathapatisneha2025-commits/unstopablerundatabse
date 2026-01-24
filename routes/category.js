const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary"); // Cloudinary config
const pool = require("../db"); // PostgreSQL pool
const path = require("path");

const router = express.Router();

// ---------------- Cloudinary storage ----------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "featured_collections",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => {
      const nameWithoutExt = path.parse(file.originalname).name;
      return `${Date.now()}-${nameWithoutExt}`;
    },
  },
});

// Multer setup
const upload = multer({ storage });

// ---------------- Get all collections ----------------
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM collections ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------------- Add new collection ----------------
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { tag, title, subtitle, path: collectionPath } = req.body;

    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const imageUrl = req.file.path;
    const publicId = req.file.filename;

    const query = `
      INSERT INTO collections (tag, title, subtitle, image_url, public_id, path)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *;
    `;
    const values = [tag, title, subtitle, imageUrl, publicId, collectionPath || "/shop"];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Update a collection ----------------
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { tag, title, subtitle, path: collectionPath } = req.body;

    const oldCollection = await pool.query("SELECT * FROM collections WHERE id=$1", [id]);
    if (!oldCollection.rows[0]) return res.status(404).json({ error: "Collection not found" });

    let imageUrl = oldCollection.rows[0].image_url;
    let publicId = oldCollection.rows[0].public_id;

    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId); // delete old image
      imageUrl = req.file.path;
      publicId = req.file.filename;
    }

    const updated = await pool.query(
      `UPDATE collections
       SET tag=$1, title=$2, subtitle=$3, image_url=$4, public_id=$5, path=$6
       WHERE id=$7
       RETURNING *`,
      [tag, title, subtitle, imageUrl, publicId, collectionPath || "/shop", id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete a collection ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM collections WHERE id=$1", [id]);
    const collection = rows[0];

    if (!collection) return res.status(404).json({ error: "Collection not found" });

    if (collection.public_id) await cloudinary.uploader.destroy(collection.public_id);
    await pool.query("DELETE FROM collections WHERE id=$1", [id]);

    res.json({ message: "Collection deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
