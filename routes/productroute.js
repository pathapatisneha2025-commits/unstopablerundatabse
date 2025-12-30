const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const { Readable } = require("stream");
const cloudinary = require("../cloudinary");

/* ================================
   MULTER MEMORY STORAGE
================================ */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================================
   CLOUDINARY BUFFER UPLOAD HELPER
================================ */
const uploadToCloudinary = (buffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

/* ======================================================
   ADD PRODUCT (MULTIPLE IMAGES)
====================================================== */
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    const result = await pool.query(
      `INSERT INTO products (name, category, price, stock, images)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, category, price, stock, imageUrls]
    );

    res.json({
      message: "Product added successfully",
      product: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ======================================================
   UPDATE PRODUCT (OPTIONAL IMAGE REPLACE)
====================================================== */
router.put("/update/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { name, category, price, stock, existingImages } = req.body;

    const existing = await pool.query(
      `SELECT images FROM products WHERE id=$1`,
      [req.params.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Start with existing images from frontend
    let imageUrls = existingImages ? JSON.parse(existingImages) : existing.rows[0].images;

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    const result = await pool.query(
      `UPDATE products
       SET name=$1, category=$2, price=$3, stock=$4, images=$5
       WHERE id=$6
       RETURNING *`,
      [name, category, price, stock, imageUrls, req.params.id]
    );

    res.json({
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


/* ======================================================
   GET ALL PRODUCTS
====================================================== */
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM products ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ======================================================
   GET PRODUCT BY ID
====================================================== */
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE id=$1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ======================================================
   UPDATE STOCK ONLY
====================================================== */
router.patch("/stock/:id", async (req, res) => {
  try {
    const { stock } = req.body;

    const result = await pool.query(
      `UPDATE products SET stock=$1 WHERE id=$2 RETURNING *`,
      [stock, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ======================================================
   DELETE PRODUCT
====================================================== */
router.delete("/delete/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM products WHERE id=$1`, [
      req.params.id,
    ]);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ======================================================
   SEARCH PRODUCTS
====================================================== */
router.get("/search/:query", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE name ILIKE $1`,
      [`%${req.params.query}%`]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
