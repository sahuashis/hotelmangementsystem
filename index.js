let express=require('express')
let mongoose=require('mongoose')
var cors=require('cors')
const { hotelrouter } = require('./App/routes/auth/auth.routes')

require('dotenv').config()

let app=express()
app.use(express.json())
app.use(cors())

//routes
app.use('/api/auth',hotelrouter)
// http://localhost:5000/api/auth


//conect to mongodb
mongoose.connect(process.env.DBURL).then(()=>{
    console.log('conected to mogodb');
    app.listen(process.env.PORT ||3000,()=>{
        console.log('server is running');
        
    })
}).catch((err)=>{
    console.log(err);
    
})