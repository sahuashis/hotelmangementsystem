const express=require('express')
const { addRoom } = require('../../controllers/room/room.controler')
const { getMyBookings } = require('../../controllers/booking/booking.controller')
const { authMiddleware } = require('../../middlewares/auth.middleware')

let Bookingroutes=express.Router()
Bookingroutes.post('/bookroom',addRoom)
Bookingroutes.get('/getmybookings',getMyBookings)

module.exports={Bookingroutes}