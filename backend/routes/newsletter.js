const router     = require('express').Router();
const Newsletter = require('../models/Newsletter');
const { sendNewsletterConfirmation } = require('../utils/mailer');

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email required.' });
  }
  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Already subscribed!' });
    }
    await Newsletter.create({ email });
    sendNewsletterConfirmation({ email }).catch(err => console.error('[EMAIL ERROR]', err.message));
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
