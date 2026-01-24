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
      'SELECT id, user_id, items, total_price, address,status, created_at FROM orders ORDER BY created_at DESC'
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


router.put("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // validation
  const allowedStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const result = await pool.query(
      `UPDATE orders
       SET status = $1
       WHERE id = $2
       RETURNING id, status`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order: result.rows[0],
    });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/guest/:mobile", async (req, res) => {
  const { mobile } = req.params;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    const query = `
      SELECT 
        o.id, 
        o.user_id, 
        o.status, 
        o.created_at, 
        o.total_price, 
        o.address, 
        COALESCE(json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'product_price', oi.product_price,
            'quantity', oi.quantity,
            'product_images', oi.product_images
          )
        ) FILTER (WHERE oi.id IS NOT NULL), '[]') AS items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id LIKE 'guest_%' 
        AND o.address->>'mobile' ILIKE $1
      GROUP BY o.id
      ORDER BY o.created_at DESC;
    `;

    // Using ILIKE allows partial or case-insensitive match
    const { rows } = await pool.query(query, [`%${mobile}%`]);

    if (!rows.length) {
      return res.status(404).json({ message: "No orders found for this number" });
    }

    res.json(rows);

  } catch (err) {
    console.error("Error fetching guest orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
