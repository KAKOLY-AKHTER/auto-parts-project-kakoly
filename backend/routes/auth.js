const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const safeUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password are required' });
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ token: signToken(user._id), user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    res.json({ token: signToken(user._id), user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user
router.get('/me', protect, (req, res) => res.json(safeUser(req.user)));

module.exports = router;
