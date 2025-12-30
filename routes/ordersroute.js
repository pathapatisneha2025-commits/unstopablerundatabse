const express = require('express');
const router = express.Router();
const pool = require('../db');

// -----------------------------
// CREATE ORDER
// -----------------------------
router.post('/create', async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!userId || !items || !items.length) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        // Calculate total price
        const totalPrice = items.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

        // Insert order with JSONB items
        const result = await pool.query(
            'INSERT INTO orders (user_id, items, total_price) VALUES ($1, $2, $3) RETURNING *',
            [userId, JSON.stringify(items), totalPrice]
        );

        res.status(201).json({ message: 'Order placed successfully', order: result.rows[0] });
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
            'SELECT id, user_id, items, total_price, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json(orders.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
