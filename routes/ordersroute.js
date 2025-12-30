const express = require('express');
const router = express.Router();
const pool = require('../db');

// -----------------------------
// CREATE ORDER
// -----------------------------
router.post('/create', async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        // Validate
        if (!userId || !items || !items.length || !address) {
            return res.status(400).json({ message: 'Invalid request: missing user/items/address' });
        }

        // Calculate total price
        const totalPrice = items.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

        // Insert order with JSONB items and address
        const result = await pool.query(
            'INSERT INTO orders (user_id, items, total_price, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, JSON.stringify(items), totalPrice, JSON.stringify(address)]
        );

        res.status(201).json({ message: 'Order placed successfully', order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/all', async (req, res) => {
  try {
    const orders = await pool.query(
      'SELECT id, user_id, items, total_price, address, created_at FROM orders ORDER BY created_at DESC'
    );
    res.json(orders.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// -----------------------------
// GET ORDERS BY USER
// -----------------------------
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await pool.query(
            'SELECT id, user_id, items, total_price, address, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json(orders.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



// GET orders count per category
router.get('/count/category', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.category, COUNT(*) AS orders_count
      FROM orders o,
      LATERAL jsonb_array_elements(o.items) AS item
      JOIN products p ON (p.id = (item->>'product_id')::int)
      GROUP BY p.category
      ORDER BY orders_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
