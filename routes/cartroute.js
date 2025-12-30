const express = require("express");
const router = express.Router();
const pool = require("../db"); // PostgreSQL pool connection

// -----------------------------
// ADD PRODUCTS TO CART (single or multiple)
// -----------------------------
router.post("/add", async (req, res) => {
  const { userId, items } = req.body;
  /*
    items = [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 }
    ]
  */
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    for (const item of items) {
      const { productId, quantity = 1 } = item;

      const existing = await pool.query(
        "SELECT id, quantity FROM cart WHERE user_id=$1 AND product_id=$2",
        [userId, productId]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          "UPDATE cart SET quantity = quantity + $1 WHERE id = $2",
          [quantity, existing.rows[0].id]
        );
      } else {
        await pool.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
          [userId, productId, quantity]
        );
      }
    }

    res.json({ message: "Products added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// -----------------------------
// GET CART FOR ALL USERS
// -----------------------------
router.get("/all", async (req, res) => {
  try {
    const cartItems = await pool.query(
      `
      SELECT 
        c.id AS cart_item_id,
        c.user_id,
        c.product_id,
        c.quantity,
        p.name,
        p.price,
        p.images
      FROM cart c
      JOIN products p ON p.id = c.product_id
      ORDER BY c.user_id
      `
    );

    res.json(cartItems.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// -----------------------------
// GET CART BY USER
// -----------------------------
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await pool.query(
      `
      SELECT 
        c.id AS cart_item_id,
        c.product_id,
        c.quantity,
        p.name,
        p.price,
        p.images
      FROM cart c
      JOIN products p ON p.id = c.product_id
      WHERE c.user_id = $1
      `,
      [userId]
    );

    res.json(cartItems.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// UPDATE QUANTITY
// -----------------------------
router.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity === undefined)
    return res.status(400).json({ message: "Missing fields" });

  try {
    if (quantity <= 0) {
      // Remove item if quantity is 0
      await pool.query(
        "DELETE FROM cart WHERE user_id=$1 AND product_id=$2",
        [userId, productId]
      );
      return res.json({ message: "Item removed" });
    }

    await pool.query(
      "UPDATE cart SET quantity=$1 WHERE user_id=$2 AND product_id=$3",
      [quantity, userId, productId]
    );

    res.json({ message: "Quantity updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// REMOVE ITEM
// -----------------------------
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  try {
    await pool.query(
      "DELETE FROM cart WHERE user_id=$1 AND product_id=$2",
      [userId, productId]
    );
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// CLEAR CART
// -----------------------------
router.delete("/clear/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await pool.query("DELETE FROM cart WHERE user_id=$1", [userId]);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
