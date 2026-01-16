const express = require("express");
const router = express.Router();
const pool = require("../db"); // PostgreSQL pool connection

// -----------------------------
// ADD PRODUCTS TO CART
// -----------------------------
router.post("/add", async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    // Fetch current product stock for all items
    const productIds = items.map(i => i.product_id);
    const productsRes = await pool.query(
      `SELECT id, stock FROM products WHERE id = ANY($1::int[])`,
      [productIds]
    );
    const productStocks = productsRes.rows.reduce((acc, p) => {
      acc[p.id] = p.stock;
      return acc;
    }, {});

    // Check if any item is out of stock
    for (const item of items) {
      if (!productStocks[item.product_id] || productStocks[item.product_id] < item.quantity) {
        return res.status(400).json({ message: `Product ${item.product_name} is out of stock or insufficient quantity` });
      }
    }

    // Deduct stock immediately
    for (const item of items) {
      await pool.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    // Check if user already has a cart
    const existingCart = await pool.query(
      "SELECT id, items FROM cart WHERE user_id=$1",
      [userId]
    );

    if (existingCart.rows.length > 0) {
      // Merge items with existing cart
      const currentItems = existingCart.rows[0].items;

      items.forEach(newItem => {
        const index = currentItems.findIndex(i => i.product_id === newItem.product_id);
        if (index !== -1) {
          currentItems[index].quantity += newItem.quantity;
        } else {
          currentItems.push(newItem);
        }
      });

      await pool.query(
        "UPDATE cart SET items=$1 WHERE id=$2",
        [JSON.stringify(currentItems), existingCart.rows[0].id]
      );
    } else {
      // Create new cart
      await pool.query(
        "INSERT INTO cart (user_id, items) VALUES ($1, $2)",
        [userId, JSON.stringify(items)]
      );
    }

    res.json({ message: "Products added to cart and stock updated" });

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
      "SELECT * FROM cart ORDER BY user_id"
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
    const cart = await pool.query(
      "SELECT * FROM cart WHERE user_id=$1",
      [userId]
    );
    if (cart.rows.length === 0) return res.json({ items: [] });
    res.json(cart.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// UPDATE QUANTITY OF AN ITEM
// -----------------------------
router.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || quantity === undefined)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const cartResult = await pool.query(
      "SELECT id, items FROM cart WHERE user_id=$1",
      [userId]
    );

    if (cartResult.rows.length === 0)
      return res.status(404).json({ message: "Cart not found" });

    const cart = cartResult.rows[0];
    let items = cart.items;

    const index = items.findIndex(i => i.product_id === productId);
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    if (quantity <= 0) {
      items.splice(index, 1); // remove item
    } else {
      items[index].quantity = quantity; // update quantity
    }

    await pool.query(
      "UPDATE cart SET items=$1 WHERE id=$2",
      [JSON.stringify(items), cart.id]
    );

    res.json({ message: "Cart updated" });
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
    const cartResult = await pool.query(
      "SELECT id, items FROM cart WHERE user_id=$1",
      [userId]
    );

    if (cartResult.rows.length === 0)
      return res.status(404).json({ message: "Cart not found" });

    const cart = cartResult.rows[0];
    const items = cart.items.filter(i => i.product_id !== productId);

    await pool.query(
      "UPDATE cart SET items=$1 WHERE id=$2",
      [JSON.stringify(items), cart.id]
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
