const router   = require('express').Router();
const Settings = require('../models/Settings');
const { protect, admin } = require('../middleware/authMiddleware');

const DEFAULTS = {
  taxRate:           0.0875,
  shippingCost:      9.99,
  shippingThreshold: 99,
  referralDiscount:  0.10,
};

async function getSetting(key) {
  const doc = await Settings.findOne({ key });
  return doc ? doc.value : DEFAULTS[key];
}

// GET /api/settings — public (for cart, etc.)
router.get('/', async (_req, res) => {
  try {
    const [taxRate, shippingCost, shippingThreshold, referralDiscount] = await Promise.all([
      getSetting('taxRate'),
      getSetting('shippingCost'),
      getSetting('shippingThreshold'),
      getSetting('referralDiscount'),
    ]);
    res.json({ taxRate, shippingCost, shippingThreshold, referralDiscount });
  } catch (err) {
    res.json(DEFAULTS);
  }
});

// PATCH /api/settings — admin only
router.patch('/', protect, admin, async (req, res) => {
  try {
    const allowed = ['taxRate', 'shippingCost', 'shippingThreshold', 'referralDiscount'];
    const updates = [];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        const value = parseFloat(req.body[key]);
        if (isNaN(value) || value < 0) continue;
        updates.push(
          Settings.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
        );
      }
    }
    await Promise.all(updates);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
