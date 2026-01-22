const express = require("express");
const router = express.Router();
const pool = require("../db"); // your PostgreSQL pool

// ---------------- Get all features ----------------
router.get("/all", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM service_features ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error("Fetch features error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Add new feature ----------------
router.post("/add", async (req, res) => {
  try {
    const { title, description, icon_name } = req.body;
    const query = `
      INSERT INTO service_features (title, description, icon_name)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, description, icon_name];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Add feature error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Update feature ----------------
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon_name } = req.body;

    const query = `
      UPDATE service_features
      SET title=$1, description=$2, icon_name=$3, updated_at=NOW()
      WHERE id=$4
      RETURNING *;
    `;
    const values = [title, description, icon_name, id];
    const { rows } = await pool.query(query, values);

    if (!rows[0]) return res.status(404).json({ error: "Feature not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Update feature error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete feature ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM service_features WHERE id=$1", [id]);
    if (!rowCount) return res.status(404).json({ error: "Feature not found" });
    res.json({ message: "Feature deleted successfully" });
  } catch (err) {
    console.error("Delete feature error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
