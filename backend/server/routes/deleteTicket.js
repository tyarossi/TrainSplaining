const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel'); // Import the Ticket model

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