const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket'); // Import the Ticket model

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

// Get all tickets for a user
router.get('/tickets/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const tickets = await Ticket.find({ userId });
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  });

// Delete a ticket
router.delete('/tickets/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Ticket.findByIdAndDelete(id);
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete ticket' });
    }
  });

module.exports = router;