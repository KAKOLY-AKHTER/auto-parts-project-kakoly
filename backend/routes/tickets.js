const router = require('express').Router();
const Ticket = require('../models/Ticket');

// GET /api/tickets/mine?email=xxx
router.get('/mine', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);
    const tickets = await Ticket.find({ userEmail: email.toLowerCase() }).sort('-createdAt');
    res.json(tickets);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST /api/tickets — create new ticket
router.post('/', async (req, res) => {
  try {
    const { userEmail, userName, subject, message } = req.body;
    if (!userEmail || !subject || !message) return res.status(400).json({ message: 'userEmail, subject and message required' });
    const ticket = await Ticket.create({
      userEmail: userEmail.toLowerCase(),
      userName:  userName || 'Customer',
      subject,
      messages:  [{ sender: 'user', text: message }],
    });
    res.status(201).json(ticket);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// POST /api/tickets/:id/reply?email=xxx — add message to ticket
router.post('/:id/reply', async (req, res) => {
  try {
    const { email } = req.query;
    const { text } = req.body;
    const ticket = await Ticket.findOne({ _id: req.params.id, userEmail: email?.toLowerCase() });
    if (!ticket) return res.status(404).json({ message: 'Not found' });
    ticket.messages.push({ sender: 'user', text });
    ticket.status = 'open';
    await ticket.save();
    res.json(ticket);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// PATCH /api/tickets/:id/close?email=xxx
router.patch('/:id/close', async (req, res) => {
  try {
    const { email } = req.query;
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, userEmail: email?.toLowerCase() },
      { status: 'closed' }, { new: true }
    );
    if (!ticket) return res.status(404).json({ message: 'Not found' });
    res.json(ticket);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
