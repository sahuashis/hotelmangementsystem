// routes/booking/booking.routes.js
const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { bookRoom, getUserBookings } = require('../../controllers/booking/booking.controller');

const bookingRouter = express.Router();

bookingRouter.post('/book',  bookRoom);
bookingRouter.get('/my-bookings',  getUserBookings);

module.exports = { bookingRouter };
