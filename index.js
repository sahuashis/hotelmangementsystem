let express=require('express')
let mongoose=require('mongoose')
var cors=require('cors')
const { hotelrouter } = require('./App/routes/auth/auth.routes')
const { Roomrouter } = require('./App/routes/room/room.route')
const { Bookingroutes, bookingRouter } = require('./App/routes/booking/booking.routes')

require('dotenv').config()

let app=express()
app.use(express.json())
app.use(cors())


//routes
app.use("/api/auth",hotelrouter)
app.use("/api/rooms",Roomrouter)
app.use('/api/bookings', bookingRouter);
// http://localhost:5000/api/auth
// http://localhost:5000/api/rooms
// http://localhost:5000/api/bookings



;



//conect to mongodb
mongoose.connect(process.env.DBURL).then(()=>{
    console.log('conected to mogodb');
    app.listen(process.env.PORT ||3000,()=>{
        console.log(`server is running ${process.env.PORT}`);
        
    })
}).catch((err)=>{
    console.log(err);
    
})