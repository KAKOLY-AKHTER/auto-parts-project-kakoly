const router = require('express').Router();
const Review = require('../models/Review');

// GET /api/reviews/mine?email=xxx
router.get('/mine', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);
    const reviews = await Review.find({ userEmail: email.toLowerCase() }).sort('-createdAt');
    res.json(reviews);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { userEmail, ...rest } = req.body;
    if (!userEmail) return res.status(400).json({ message: 'userEmail required' });
    const review = await Review.create({ userEmail: userEmail.toLowerCase(), ...rest });
    res.status(201).json(review);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// DELETE /api/reviews/:id?email=xxx
router.delete('/:id', async (req, res) => {
  try {
    const { email } = req.query;
    const r = await Review.findOne({ _id: req.params.id, userEmail: email?.toLowerCase() });
    if (!r) return res.status(404).json({ message: 'Not found' });
    await r.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
