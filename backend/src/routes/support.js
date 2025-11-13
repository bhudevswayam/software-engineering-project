const express = require('express');
const router = express.Router();

/**
 * In-memory tickets store (replace with DB as needed)
 * status: 'open' | 'in_progress' | 'resolved'
 */
const TICKETS = new Map();

router.get('/tickets', (_req, res) => {
  const tickets = Array.from(TICKETS.values());
  res.json({ tickets });
});

router.post('/tickets', (req, res) => {
  const { name, email, subject, description, priority = 'medium', category } = req.body || {};
  if (!name || !email || !subject || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const id = Math.random().toString(36).slice(2, 10);
  const ticket = { id, name, email, subject, description, priority, category, status: 'open', createdAt: new Date().toISOString() };
  TICKETS.set(id, ticket);
  res.status(201).json({ ticket });
});

router.patch('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const t = TICKETS.get(id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  const allowed = ['open', 'in_progress', 'resolved'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  t.status = status;
  TICKETS.set(id, t);
  res.json({ ticket: t });
});

module.exports = router;
