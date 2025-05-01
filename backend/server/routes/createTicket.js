const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel'); // Import the Ticket model

// Create a new ticket
router.post('/createTickets', async (req, res) => {
    try {
        const { userId, line, departure, arrival} = req.body; // Extract fields from the request body
        if (!userId || !line || !departure || !arrival) {
            return res.status(400).json({ error: 'All fields are required' }); // Validation error
        }
        const ticket = new Ticket({ userId, line, departure, arrival}); // Create a new ticket
        await ticket.save();
        res.status(201).json(ticket); // Respond with the created ticket
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Failed to create ticket' }); // Internal server error
    }
});

module.exports = router;