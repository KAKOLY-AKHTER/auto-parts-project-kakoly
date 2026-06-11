const router  = require('express').Router();
const Vehicle = require('../models/Vehicle');

// GET /api/vehicles?email=user@example.com
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);
    const vehicles = await Vehicle.find({ userEmail: email.toLowerCase() }).sort('-createdAt');
    res.json(vehicles);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// POST /api/vehicles  — body: { userEmail, year, make, model, ... }
router.post('/', async (req, res) => {
  try {
    const { userEmail, ...data } = req.body;
    if (!userEmail) return res.status(400).json({ message: 'userEmail required' });
    const v = await Vehicle.create({ userEmail: userEmail.toLowerCase(), ...data });
    res.status(201).json(v);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// DELETE /api/vehicles/:id?email=user@example.com
router.delete('/:id', async (req, res) => {
  try {
    const { email } = req.query;
    const v = await Vehicle.findOne({ _id: req.params.id, userEmail: email?.toLowerCase() });
    if (!v) return res.status(404).json({ message: 'Not found' });
    await v.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
