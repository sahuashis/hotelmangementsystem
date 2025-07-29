const Booking = require("../../models/booking/booking.model");
const Room = require("../../models/room/room.model");

// POST /book – Book a room
const bookRoom = async (req, res) => {
  const { roomId, checkIn, checkOut } = req.body;
  const userId = req.user.id;

  try {
    const room = await Room.findById(roomId);
    if (!room || !room.isAvailable) {
      return res.status(400).json({ message: "Room not available" });
    }

    const newBooking = new Booking({
      userId,
      roomId,
      checkIn,
      checkOut,
      status: "confirmed"
    });

    await newBooking.save();

    // Optional: set room unavailable
    room.isAvailable = false;
    await room.save();

    res.status(201).json({ message: "Room booked successfully", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// GET /my-bookings – Show user's bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("roomId", "number type price")
      .sort({ checkIn: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

module.exports = { bookRoom, getMyBookings };
