let express=require('express')
const { registeruser, loginuser } = require('../../controllers/auth/auth.controler')


let hotelrouter=express.Router()

hotelrouter.post('/register',registeruser)
hotelrouter.post('/loginuser',loginuser)

module.exports={hotelrouter}

