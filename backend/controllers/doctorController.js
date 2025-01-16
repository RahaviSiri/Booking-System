import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import appointmentModel from "../models/appointmentModel.js";


const changeAvailability = async (req,res) => {

    try {

        const { docId } = req.body;
        const doctor = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!doctor.available})
        res.json({success: true, message:"Availability Changes"});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

// Get all doctors details
const allDoctors = async (req, res) => {
    try {
      const doctors = await doctorModel.find({}).select(['-password','-email'])
      res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for doctor Login
const doctorLogin = async (req,res) => {
    try {

        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({ success: false, message: "Invalid Doctor Data" });
        }

        const isMatch = await bcrypt.compare(password,doctor.password);
        if(!isMatch){
            return res.json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)

        return res.json({ success: true, token })
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get doctor appointments
const getAppointments = async (req,res) => {
    try {

        const { docId } = req.body;
        const doctorAppointment = await appointmentModel.find({docId});
        res.json({ success: true, doctorAppointment });
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API mark as completed
const markCompleted = async (req, res) => {
    try {
        const { appointmentId, docId } = req.body;

        // Fetch appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId.toString() === docId) {
            // Update appointment as completed
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        } else {
            return res.json({ success: false, message: "Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// API to cancel
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId, docId } = req.body;

        // Fetch appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId.toString() === docId) {
            // Update appointment as cancelled
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCancelled: true });
            return res.json({ success: true, message: "Appointment Cancelled" });
        } else {
            return res.json({ success: false, message: "Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


export {changeAvailability,allDoctors,doctorLogin,getAppointments,markCompleted,cancelAppointment}