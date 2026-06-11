const router = require('express').Router();
const Order  = require('../models/Order');

// POST /api/orders — place order (public)
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// GET /api/orders/mine?email=xxx — user's orders
router.get('/mine', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);
    const orders = await Order.find({ userEmail: email.toLowerCase() }).sort('-createdAt');
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
