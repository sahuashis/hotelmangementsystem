// models/booking/booking.model.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'authuser', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rooms', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
