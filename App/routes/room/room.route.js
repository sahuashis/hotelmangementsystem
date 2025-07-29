let express=require('express')
const { getAllRooms, addRoom, updateRoom, deleteRoom } = require('../../controllers/room/room.controler')
const { authMiddleware, isAdmin } = require('../../middlewares/auth.middleware')

const Roomrouter=express.Router()
//public
Roomrouter.get('/allrooms',getAllRooms)

//Adimn
Roomrouter.post('/addroom', addRoom)
Roomrouter.put('/:id',authMiddleware,isAdmin,updateRoom)
Roomrouter.delete('/:id',authMiddleware,isAdmin,deleteRoom)

module.exports={Roomrouter}