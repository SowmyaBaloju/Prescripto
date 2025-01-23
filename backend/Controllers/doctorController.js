import doctorModel from '../Models/doctorModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppointmentModel from '../Models/AppointmentModel.js';


const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability Changed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
// api to get 
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API FOR DOCTOR LOGIN
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            res.json({ success: false, message: "Inavlid Credintials" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Inavlid Credintials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// to get api of doctor panel (related doc)
const appointmentsDoc = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await AppointmentModel.find({ docId })
        res.json({ success: true, appointments })
        console.log(appointments)
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// api to mark appointment complete
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await AppointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            return res.json({ success: false, message: "Mark Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to cancel appointment complete
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await AppointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, { Cancelled: true })
            return res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.json({ success: false, message: "Cancellation Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API TO GET DASHBOARD DATA FRO DOCTOR PANEL
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await AppointmentModel.find({ docId })
        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })



        let patients = []
        appointments.map((item) => {
            if (patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// to get the doctor profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//  to edit or update the doctorprofile data
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: "Profile is Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoc, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile }
