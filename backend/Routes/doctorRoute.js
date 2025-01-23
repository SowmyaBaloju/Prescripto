// // import mongoose from "mongoose";
// import express from 'express'
// import { doctorList } from '../Controllers/doctorController.js'


// const doctorRouter= express.Router()

// doctorRouter.get('/list',doctorList)

// export default doctorRouter

import express from 'express';
import  {appointmentCancel, appointmentComplete, appointmentsDoc, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile} from '../Controllers/doctorController.js';
import authDoctor from '../Middleware/authDoctor.js';


const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoc)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter