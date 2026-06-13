const router = require('express').Router();
const User   = require('../models/User');
const Order  = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all customers — admin only
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort('-createdAt');
    res.json(users);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
