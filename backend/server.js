import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './Config/MongoDB.js';
import { connectCloudinary } from './Config/Cloudinary.js';
import adminRouter from './Routes/adminRoute.js';
import doctorRouter from './Routes/doctorRoute.js';
import userRouter from './Routes/userRoute.js';


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

// api endpoint
app.use('/api/admin',adminRouter)
// localhost:4000/api/admin/add-doctor 


app.get('/',(req,res)=>{
    res.send('API WORKING.....')
})
app.listen(port,(req,res)=>{
    console.log("Server Started",port)
})