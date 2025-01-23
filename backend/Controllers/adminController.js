import validator from 'validator';
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from "../Models/doctorModel.js"
import jwt from 'jsonwebtoken';
import AppointmentModel from '../Models/AppointmentModel.js';
import userModel from '../Models/userModel.js';

// API FOR ADDING DOCTOR

const addDoctor = async (req,res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
        const imageFile = req.file
        // console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile)
        // checking for all data to add doctor 
        // if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
        //     return res.json({success:false,message:"Data Entered Successfully"})
        // }
        // res.json({success:true,message:"Missing Details"})

        // validating email format
        if(!validator.isEmail(email)){
            res.json({success:false,message:"Please enter a valid email"})

        }
        // validating strong password
        if(password.length <8 ){
            return res.json({success:false,message:"Please enter astrong password"})
        }
        
        // hasing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)



        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl =imageUpload.secure_url


        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})



        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}

// API FOR THE ADMIN LOGIN
const loginAdmin = async (req,res)=>{
    try {

        const {email,password} = req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token = jwt.sign(email+password,process.env.JWT_SECRET)
           res.json({success:true,token})
        }else{
            res.json({success:false,message:"Inavlid Credintials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}

// api to get all doc list at admin pannel
const allDoctors = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
}


// API to get all appointments lits
const appointmentsAdmin = async (req,res)=>{
    try {
        const appointments = await AppointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// API TO CANCEL THE APPOINTMENT
const appointmentCancel = async (req,res)=>{
    try {
      const {appointmentId} = req.body
      const appoinmentData = await AppointmentModel.findById(appointmentId)
    
      await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true}) 

    //   releasing doc slot
    const {docId,slotDate,slotTime} = appoinmentData
    const docData = await doctorModel.findById(docId)
    let slotsBooked = docData.slotsBooked
    slotsBooked[slotDate] = slotsBooked[slotDate].filter(e=>e!==slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slotsBooked})
    
    
    
    // if (!slotsBooked) {
    //     slotsBooked = {}; // Initialize if undefined
    // }

    // // Check if slotDate exists
    // if (!slotsBooked[slotDate]) {
    //     return res.json({ success: false, message: "Slot date not found in doctor's records" });
      
    // }

    // // Remove the slot if it exists
    // const index = slotsBooked[slotDate].indexOf(slotTime);
    // if (index > -1) {
    //     slotsBooked[slotDate].splice(index, 1); // Remove the slot
    // } else {
    //     return res.json({ success: false, message: "Slot time not found for the given date" });
    // }

    // // Update doctor data
    // await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    // // Delete the appointment from the database
    // // await AppointmentModel.findByIdAndDelete(appointmentId);

    res.json({success:true,message:"Appointment is Cancelled"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message  });
    }
}

// API TO GET DASHBOARD DATA FOR ADMIN PANEL
const adminDashboard = async (req,res)=>{
    try {
      const doctors = await doctorModel.find({})
      const users = await userModel.find({})
      const appointments = await AppointmentModel.find({})
      
      const dashData = {
        doctors: doctors.length,
        appointments : appointments.length,
        patients : users.length,
        latestAppointments:appointments.reverse().slice(0,5)

      }
      res.json({success:true,dashData})
      
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message  });
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}