const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  line: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  datePurchased: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);