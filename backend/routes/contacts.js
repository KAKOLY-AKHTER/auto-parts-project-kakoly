const router  = require('express').Router();
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/authMiddleware');
const { sendContactNotification } = require('../utils/mailer');

// POST submit — public
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    sendContactNotification({
      name:    contact.name,
      email:   contact.email,
      phone:   contact.phone || '',
      subject: contact.subject || '',
      message: contact.message,
    }).catch(err => console.error('[EMAIL ERROR]', err.message));
    res.status(201).json({ message: 'Message received', id: contact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all messages — admin only
router.get('/', protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH mark as read — admin only
router.patch('/:id/read', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
