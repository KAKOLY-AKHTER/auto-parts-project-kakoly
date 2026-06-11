const router  = require('express').Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');

// POST create — public (guests can book without login)
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all — admin only
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ date: 1 })
      .populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my bookings — by email (Firebase user, no JWT needed)
router.get('/mine', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);
    const bookings = await Booking.find({ email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } })
      .sort('-createdAt');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update status — admin only
router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
