const router = require('express').Router();
const Order  = require('../models/Order');
const { sendOrderConfirmation } = require('../utils/mailer');

// POST /api/orders — place order (public)
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
    sendOrderConfirmation({
      to:      order.userEmail,
      name:    order.userName || 'Customer',
      orderId: order._id.toString().slice(-8).toUpperCase(),
      items:   order.items || [],
      total:   order.total,
    }).catch(() => {});
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
