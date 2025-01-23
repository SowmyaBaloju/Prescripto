import express from 'express';
import { bookAppointment, cancelAppointment, getProfile, listAppointments, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from '../Controllers/userController.js';
import authUser from '../Middleware/authUser.js';
import upload from '../Middleware/multer.js';

const userRouter = express.Router();


// api

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single("image"),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter