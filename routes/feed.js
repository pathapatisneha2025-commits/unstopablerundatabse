const express = require("express");
const pool = require("../db"); // PostgreSQL pool

const router = express.Router();

// ---------------- Add a new feed item ----------------
router.post("/add", async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || !["video", "image"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const query = `
      INSERT INTO feed_items (type)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [type];
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
      "SELECT id, type FROM feed_items ORDER BY id ASC;"
    );
    res.json(rows);
  } catch (err) {
    console.error("Fetch feed error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete a feed item by ID ----------------
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

// ---------------- Update a feed item type ----------------
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type || !["video", "image"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const query = `
      UPDATE feed_items
      SET type = $1
      WHERE id = $2
      RETURNING id, type;
    `;
    const values = [type, id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) return res.status(404).json({ error: "Feed item not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Update feed error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
