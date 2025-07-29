// controllers/booking/booking.controller.js
const Booking = require('../../models/booking/booking.model');
const Room = require('../../models/room/room.model');

// POST /book
const bookRoom = async (req, res) => {
  try {
    const { userId, roomId, checkIn, checkOut } = req.body;

    const room = await Room.findById(roomId);
    if (!room || !room.isAvailable) {
      return res.status(400).json({ message: 'Room not available' });
    }

    const booking = new Booking({
      userId,
      roomId,
      checkIn,
      checkOut
    });

    await booking.save();

    room.isAvailable = false;
    await room.save();

    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to book room', error: err.message });
  }
};


// GET /my-bookings
const getUserBookings = async (req, res) => {
  try {
    const userId = req.query.userId; // ✅ Only use query param for GET

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const bookings = await Booking.find({ userId }).populate('roomId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};


module.exports = { bookRoom, getUserBookings };
