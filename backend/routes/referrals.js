const router   = require('express').Router();
const Referral = require('../models/Referral');

function codeFromEmail(email) {
  try { return Buffer.from(email).toString('base64').replace(/=/g,'').slice(0,8).toUpperCase(); }
  catch { return ''; }
}

// POST /api/referrals/register — called after signup when ?ref= param exists
router.post('/register', async (req, res) => {
  try {
    const { referralCode, referredEmail } = req.body;
    if (!referralCode || !referredEmail) return res.status(400).json({ message: 'Missing fields' });

    // Don't let someone refer themselves
    const selfCode = codeFromEmail(referredEmail);
    if (selfCode === referralCode.toUpperCase()) return res.json({ ok: true });

    // Find referrer by code (check all users' generated codes)
    // We store the code directly — frontend must pass it
    const existing = await Referral.findOne({ referredEmail: referredEmail.toLowerCase() });
    if (existing) return res.json({ ok: true }); // already registered

    // We need referrer email — frontend passes it via reverse lookup not possible here
    // So frontend must also send referrerEmail (decoded from code) OR we store code→email mapping
    // Simplest: frontend decodes code back to email
    const { referrerEmail } = req.body;
    if (!referrerEmail) return res.status(400).json({ message: 'Missing referrerEmail' });

    await Referral.create({
      referrerEmail: referrerEmail.toLowerCase(),
      referralCode:  referralCode.toUpperCase(),
      referredEmail: referredEmail.toLowerCase(),
    });
    res.json({ ok: true });
  } catch (e) {
    if (e.code === 11000) return res.json({ ok: true }); // duplicate — ignore
    res.status(500).json({ message: e.message });
  }
});

// GET /api/referrals/stats?email= — referrer's stats
router.get('/stats', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json({ friendsJoined: 0, rewardsEarned: 0 });
    const all      = await Referral.find({ referrerEmail: email.toLowerCase() });
    const rewarded = all.filter(r => r.rewarded).length;
    res.json({ friendsJoined: all.length, rewardsEarned: rewarded, bonusPoints: rewarded * 200 });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// GET /api/referrals/discount?email= — check if this user has unused referral discount
router.get('/discount', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json({ hasDiscount: false });
    const ref = await Referral.findOne({ referredEmail: email.toLowerCase(), rewarded: false });
    res.json({ hasDiscount: !!ref });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST /api/referrals/redeem — called when referred user places first order
router.post('/redeem', async (req, res) => {
  try {
    const { referredEmail } = req.body;
    if (!referredEmail) return res.json({ ok: true });
    await Referral.findOneAndUpdate(
      { referredEmail: referredEmail.toLowerCase(), rewarded: false },
      { rewarded: true }
    );
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
