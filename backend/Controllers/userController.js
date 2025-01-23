import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../Models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../Models/doctorModel.js';
import AppointmentModel from '../Models/AppointmentModel.js';
import razorpay from 'razorpay';


// api to register user

const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"}) 
        }
        if(password.length<8){
            return res.json({success:false,message:"Enter a Strong Password"}) 
        }
    //   hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData = {
        name,
        email,
        password:hashedPassword
    }

    const newUser = new userModel(userData)
    const user =await newUser.save()
//  _id
const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

        
    }
}

// api for userlogin
const loginUser = async (req,res)=>{
    try {
        const {email,password}= req.body
        const user = await userModel.findOne({email})
        if(!user){
          return  res.json({success:false,message:"user does not Exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
            if (isMatch){
             const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
             res.json({success:true,token})
            }else{
                res.json({success:false,message:"Invalid Credintials"})
            }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

        
    }
}

// api to get userProfile data
const getProfile = async (req,res)=>{
    try {
      const {userId} = req.body
      const userData = await userModel.findById(userId).select('-password')
      res.json({success:true,userData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

const updateProfile = async (req,res)=>{
    try {
       const {userId,name,phone,address,dob,gender}= req.body
       const imageFile = req.file
       if(!name || !phone || !dob || !gender){
return res.json({success:false,message:error.message})
       } 
       await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
       if(imageFile){
        // upload image cloudinary 
        const imageUpload =  await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageURL = imageUpload.secure_url


        await userModel.findByIdAndUpdate(userId,{image:imageURL})

       }
       res.json({success:true,message:"Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
    
}



// api to book appointment
// const bookAppointment = async (req,res)=>{
//     try {
//        const {userId,docId,slotDate,slotTime} = req.body
//        const docData = await doctorModel.findById(docId).select('-password')
//        if(!docData.available){
//         return res.json({success:false,message:"Doctor is Not Available"})

//        }
//        let slotsBooked = docData.slotsBooked 
//     //    CHECKING FOR SLOTS AVAILABLITY
//     if(slotsBooked[slotDate]){
//         if(slotsBooked[slotDate].includes(slotTime)){
//             return res.json({success:false,message:"SlotTime is Not Available"})
//         }else{
//             slotsBooked[slotDate].push(slotTime)
//         }
       

//     }else{
//         slotsBooked[slotDate]=[]
//         slotsBooked[slotDate].push(slotTime)
//     }
//     const userData = await userModel.findById(userId).select('-password')

//     delete docData.slotsBooked

//     const appoinmentData ={
//         userId,
//         docId,
//         userData,
//         docData,
//         amount:docData.fees,
//         slotTime,
//         slotDate,
//         date:  Date.now()
//     }
//     const newAppointment = new AppointmentModel(appoinmentData)
//     await newAppointment.save()

//     // save new slots data in docData
//     await doctorModel.findByIdAndUpdate(docId,{slotsBooked})
//     res.json({success:true,message:'Appointmentt is booked'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message}) 
//     }
// }

const bookAppointment = async (req, res) => {
    try {
      const { userId, docId, slotDate, slotTime } = req.body;
  
      // Fetch doctor data and ensure they are available
      const doctor = await doctorModel.findById(docId).select('-password');
      if (!doctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }
  
      if (!doctor.available) {
        return res.json({ success: false, message: "Doctor is not available" });
      }
  
      // Check if an appointment already exists for this doctor, date, and time
      const existingAppointment = await AppointmentModel.findOne({
        docId,
        slotDate,
        slotTime,
      });
  
      if (existingAppointment) {
        return res.json({
          success: false,
          message: "This slot is already booked. Please select another time.",
        });
      }
  
      // Fetch user data
      const user = await userModel.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Create appointment data
      const appointmentData = {
        userId,
        docId,
        userData: user,
        docData: doctor,
        amount: doctor.fees,
        slotTime,
        slotDate,
        date: Date.now(),
      };
  
      const newAppointment = new AppointmentModel(appointmentData);
      await newAppointment.save();
  
      // Update slotsBooked for the doctor
      let slotsBooked = doctor.slotsBooked || {};
      if (!slotsBooked[slotDate]) {
        slotsBooked[slotDate] = [];
      }
      slotsBooked[slotDate].push(slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slotsBooked });
  
      return res.json({ success: true, message: "Appointment is booked successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while booking the appointment",
        error: error.message,
      });
    }
  };
  











  
  

// api to get user appointments
const listAppointments = async (req,res)=>{
    try {
        const {userId} = req.body
        const appointments= await AppointmentModel.find({userId})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        res.json({ success: false, message: error.message || "An unexpected error occurred" });
    }
}

// api to cancel appointment
const cancelAppointment = async (req,res)=>{
    try {
      const {userId,appointmentId} = req.body
      const appoinmentData = await AppointmentModel.findById(appointmentId)
    //   verify appointment user
      if(appoinmentData.userId !==userId){
        return res.json({success:false,message:"UnAuthorised Action"})
      } 
      await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true}) 

    //   releasing doc slot
    const {docId,slotDate,slotTime} = appoinmentData
    const docData = await doctorModel.findById(docId)
    let slotsBooked = docData.slotsBooked
    // slotsBooked[slotDate] = slotsBooked[slotDate].filter(e=>e!==slotTime)
    // await doctorModel.findByIdAndUpdate(docId,{slotsBooked})
    
    
    
    if (!slotsBooked) {
        slotsBooked = {}; // Initialize if undefined
    }

    // Check if slotDate exists
    if (!slotsBooked[slotDate]) {
        return res.json({ success: false, message: "Slot date not found in doctor's records" });
      
    }

    // Remove the slot if it exists
    const index = slotsBooked[slotDate].indexOf(slotTime);
    if (index > -1) {
        slotsBooked[slotDate].splice(index, 1); // Remove the slot
    } else {
        return res.json({ success: false, message: "Slot time not found for the given date" });
    }

    // Update doctor data
    await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    // Delete the appointment from the database
    // await AppointmentModel.findByIdAndDelete(appointmentId);






    res.json({success:true,message:"Appointment is Cancelled"})
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        res.json({ success: false, message: error.message || "An unexpected error occurred" });
    }
}
const razorpayInstance =new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET

})
// api to make payment to appointment using razor pay
const paymentRazorpay = async (req,res)=>{

    try {
        const {appointmentId} = req.body
        const appoinmentData = await AppointmentModel.findById(appointmentId)
        if(!appoinmentData || appoinmentData.cancelled){
            return res.json({success:false,message:"Appointment is Cancelled OR Not FOUND"})
        }
        // creatingg options for razorpay payment
        const options = {
            amount:appoinmentData.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        }
        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({success:true,order})
    
        
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        res.json({ success: false, message: error.message || "An unexpected error occurred" }); 
    }
}
   
//  API to verify razorpay payment
const verifyRazorpay = async (req,res)=>{
    try {
       const {razorpay_order_id} = req.body
       const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
       
    //    console.log(orderInfo)
       if(orderInfo.status==='paid'){
            await AppointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment is Successfull"})

       }else{
        res.json({success:false,message:"Payment is Failed"})
       }
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        res.json({ success: false, message: error.message || "An unexpected error occurred" }); 
    }
}

export { registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointments,cancelAppointment,paymentRazorpay,verifyRazorpay}