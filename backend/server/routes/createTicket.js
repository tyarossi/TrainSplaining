const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel'); // Import the Ticket model

// Create a new ticket
router.post('/tickets', async (req, res) => {
    try {
      const { user, line, departure, arrival } = req.body;
      if (!user || !line || !departure || !arrival) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const ticket = new Ticket({ userId, line, departure, arrival });
      await ticket.save();
      res.status(201).json(ticket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({ error: 'Failed to create ticket' });
    }
  });

  module.exports = router;