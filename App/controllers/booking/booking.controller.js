const Booking = require('../../models/booking/booking.model');
const Room = require('../../models/room/room.model');
  const  razorpay=require("../../config/razorpay.config")

 const pay = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, 
      currency:"INR"
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log(err);
    
    res.status(500).send("Payment order creation failed");
  }
};;
// POST /book
const bookRoom = async (req, res) => {
  try {
    const { userId, roomId, checkIn, checkOut, paymentId, status } = req.body;

    if (!userId || !roomId || !checkIn || !checkOut || !paymentId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ message: 'Invalid check-in or check-out date' });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }

    // Check Room Availability
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (!room.isAvailable) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    const booking = new Booking({
      userId,
      roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      paymentId,
      status: status || 'paid'
    });

    await booking.save();

    // Update Room Availability
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
    const userId = req.query.userId; 

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const bookings = await Booking.find({ userId }).populate('roomId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};


module.exports = { bookRoom, getUserBookings ,pay};
