import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

// API for add doctor
const addDoctor = async (req,res) => {

    try {
        const { name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file;
        
        if(!name|| !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            res.json({success: false, message:"Missing the Details"});
        }

        if(!validator.isEmail(email)){
            res.json({success: false, message:"Enter valid Email"});
        }

        if(password.length < 8){
            res.json({success: false, message:"Enter 8 digit correct password"});
        }

        // Hashing the Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
        const imageURL = imageUpload.secure_url;

        const doctorData = { 
            name,
            email,
            password: hashPassword,
            image: imageURL,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success: true, message:"Doctor Added"});


    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

// API for login admin
const loginAdmin = async (req,res) => {

    try {
        const { email,password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:'Invalid Password and Email'});
        }
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

// Get all doctors details
const allDoctors = async (req, res) => {
    try {
      const doctors = await doctorModel.find({}).select('-password')
      res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all appointment list
const getAllAppoiintment = async (req,res) => {

    try {

        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments })
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
} 

// API to cancel user appointments
const cancelUserAppointments = async (req,res) => {
    try {

        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        
        await appointmentModel.findByIdAndUpdate(appointmentId, {isCancelled : true});

        // Releasing Doctor slots
        const {docId,slotDate,slotTime} = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success:true,message:"Successfully Deleted"})
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }   
}

// API to get dashboard data to admin panel
const getDashBoardData = async (req,res) => {

    try {
        const users = await userModel.find({});
        const doctors = await doctorModel.find({});
        const appointments  = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5) 
        }
        res.json({success:true,dashData});
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
  

export { addDoctor,loginAdmin,allDoctors,getAllAppoiintment,cancelUserAppointments,getDashBoardData }