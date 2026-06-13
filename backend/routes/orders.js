const router = require('express').Router();
const Order  = require('../models/Order');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('../utils/mailer');
const { protect, admin } = require('../middleware/authMiddleware');

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
    }).catch(err => console.error('[EMAIL ERROR]', err.message));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// GET /api/orders — admin: all orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt');
    res.json(orders);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// PATCH /api/orders/:id/status — admin: update status
router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
    sendOrderStatusUpdate({
      to:      order.userEmail,
      name:    order.userName || 'Customer',
      orderId: order._id.toString().slice(-8).toUpperCase(),
      status:  req.body.status,
    }).catch(err => console.error('[EMAIL ERROR]', err.message));
  } catch (e) { res.status(400).json({ message: e.message }); }
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
