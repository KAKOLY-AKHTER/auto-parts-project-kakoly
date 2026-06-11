const router  = require('express').Router();
const Address = require('../models/Address');

// GET /api/addresses?email=xxx
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);
    const list = await Address.find({ userEmail: email.toLowerCase() }).sort('-isDefault -createdAt');
    res.json(list);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST /api/addresses
router.post('/', async (req, res) => {
  try {
    const { userEmail, isDefault, ...rest } = req.body;
    if (!userEmail) return res.status(400).json({ message: 'userEmail required' });
    if (isDefault) await Address.updateMany({ userEmail: userEmail.toLowerCase() }, { isDefault: false });
    const addr = await Address.create({ userEmail: userEmail.toLowerCase(), isDefault: !!isDefault, ...rest });
    res.status(201).json(addr);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// PATCH /api/addresses/:id/default?email=xxx
router.patch('/:id/default', async (req, res) => {
  try {
    const { email } = req.query;
    await Address.updateMany({ userEmail: email?.toLowerCase() }, { isDefault: false });
    const addr = await Address.findOneAndUpdate(
      { _id: req.params.id, userEmail: email?.toLowerCase() },
      { isDefault: true }, { new: true }
    );
    if (!addr) return res.status(404).json({ message: 'Not found' });
    res.json(addr);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// DELETE /api/addresses/:id?email=xxx
router.delete('/:id', async (req, res) => {
  try {
    const { email } = req.query;
    const addr = await Address.findOne({ _id: req.params.id, userEmail: email?.toLowerCase() });
    if (!addr) return res.status(404).json({ message: 'Not found' });
    await addr.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
