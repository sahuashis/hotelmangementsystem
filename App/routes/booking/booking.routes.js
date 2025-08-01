// routes/booking/booking.routes.js
const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { bookRoom, getUserBookings ,pay } = require('../../controllers/booking/booking.controller');

const bookingRouter = express.Router();
bookingRouter.post('/pay',authMiddleware,  pay);
bookingRouter.post('/book', authMiddleware, bookRoom);
bookingRouter.get('/my-bookings',  getUserBookings);

module.exports = { bookingRouter };
