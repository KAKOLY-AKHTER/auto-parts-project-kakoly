const router   = require('express').Router();
const Wishlist = require('../models/Wishlist');

// GET /api/wishlist?email=
router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'email required' });
  try {
    const doc = await Wishlist.findOne({ userEmail: email.toLowerCase() });
    res.json(doc ? doc.items : []);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/wishlist  — body: { email, item: { productId, name, price, image, category } }
router.post('/', async (req, res) => {
  const { email, item } = req.body;
  if (!email || !item?.productId) return res.status(400).json({ error: 'email and item required' });
  try {
    let doc = await Wishlist.findOne({ userEmail: email.toLowerCase() });
    if (!doc) doc = new Wishlist({ userEmail: email.toLowerCase(), items: [] });
    if (!doc.items.some(i => i.productId === item.productId)) doc.items.push(item);
    await doc.save();
    res.json(doc.items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/wishlist/:productId?email=
router.delete('/:productId', async (req, res) => {
  const { email } = req.query;
  const productId = Number(req.params.productId);
  if (!email) return res.status(400).json({ error: 'email required' });
  try {
    const doc = await Wishlist.findOne({ userEmail: email.toLowerCase() });
    if (!doc) return res.json([]);
    doc.items = doc.items.filter(i => i.productId !== productId);
    await doc.save();
    res.json(doc.items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
