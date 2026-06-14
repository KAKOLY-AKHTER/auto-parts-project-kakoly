const router  = require('express').Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');
const { sendBookingConfirmation, sendBookingStatusUpdate } = require('../utils/mailer');

// POST create — public (guests can book without login)
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
    sendBookingConfirmation({
      to:      booking.email,
      name:    booking.name,
      service: booking.service,
      date:    booking.date,
      time:    booking.time,
      refId:   booking._id.toString().slice(-8).toUpperCase(),
    }).catch(err => console.error('[EMAIL ERROR]', err.message));
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

// PATCH cancel — user can cancel own booking
router.patch('/:id/cancel', async (req, res) => {
  try {
    const { email } = req.query;
    const safe = email?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const booking = await Booking.findOne({ _id: req.params.id, email: { $regex: `^${safe}$`, $options: 'i' } });
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (booking.status === 'completed') return res.status(400).json({ message: 'Cannot cancel a completed booking' });
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PATCH reschedule — user can change date/time of own booking
router.patch('/:id/reschedule', async (req, res) => {
  try {
    const { email } = req.query;
    const { date, time } = req.body;
    const safe = email?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const booking = await Booking.findOne({ _id: req.params.id, email: { $regex: `^${safe}$`, $options: 'i' } });
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (['completed','cancelled'].includes(booking.status)) return res.status(400).json({ message: 'Cannot reschedule this booking' });
    if (date) booking.date = date;
    if (time) booking.time = time;
    booking.status = 'confirmed';
    await booking.save();
    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
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
    if (booking.email && ['confirmed','completed','cancelled'].includes(req.body.status)) {
      sendBookingStatusUpdate({
        to:      booking.email,
        name:    booking.name,
        service: booking.service,
        date:    booking.date,
        time:    booking.time,
        status:  req.body.status,
        refId:   booking._id.toString().slice(-8).toUpperCase(),
      }).catch(err => console.error('[EMAIL ERROR]', err.message));
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
