import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import razorpay from "razorpay"

// API to register user
const registerUser = async (req,res) => {

    try {

        const {name,email,password} = req.body;

        if(!name || !password || !email){
            return res.json({success:false,message:"Enter the details"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"});
        }
        if(password.length < 8){
            return res.json({success:false,message:"Enter strong password"});
        }

        // Hashing the Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const userData = {
            name:name,
            email:email,
            password:hashPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success: true, token});


    } catch (error) {
        res.json({success:false,message:error.message});
    }

}

// API for login user
const loginUser = async (req,res) => {

    try {
        const { email,password } = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }else{
            return res.json({success:false,message:'Invalid Password'});
        }
        
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

// API to get user Data
const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// API to update userProfile
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender, userId } = req.body;
        const imageFile = req.file;

        if(!name || !phone ||  !dob || !gender ){
            return res.status(404).json({ success: false, message: "Enter the details" });
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imageFile){
            // Upload at cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
            const imageURL = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId,{image:imageURL});

        }

        res.json({ success: true, message:"Profile Updated" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// API to produce appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const userData = await userModel.findById(userId).select("-password");
        const docData = await doctorModel.findById(docId).select("-password");

        if (!docData || !userData) {
            return res.status(404).json({ success: false, message: "User or Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked || {}; // Initialize slots_booked if undefined

        // Checking Availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Delete slots_booked to avoid storing it in the appointment model
        const { slots_booked: _, ...docDataWithoutSlots } = docData.toObject();

        const appointment = {
            userId,
            docId,
            userData,
            docData: docDataWithoutSlots, // Store doc data without slots_booked
            slotDate,
            slotTime,
            date: Date.now(),
            fees: docData.fees // Assuming docData.fees is available
        };

        const newAppointment = new appointmentModel(appointment);
        await newAppointment.save();

        // Save updated slots_booked in doctor data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Booked" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// API to get user appointments
const getUserAppointments = async (req,res) => {
    try {

        const { userId } = req.body;
        const appointments = await appointmentModel.find( { userId });
        // Filter Object: The .find() method requires the argument to be an object, like { userId: value }. Previously, you were passing userId directly, which caused the error.
        // By using { userId }, you're filtering documents where the userId field matches the provided value.

        res.json({success:true,appointments})
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }   
}

// API to cancel user appointments
const cancelUserAppointments = async (req,res) => {
    try {

        const { appointmentId,userId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if(appointmentData.userId !== userId){
            return res.json({ success: false, message: "Invalid User" });
        }
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

const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:  process.env.RAZORPAY_KEY_SECRET
})

// API to procced payment
const proccedPayment = async (req,res) => {

    try {

        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if(!appointmentData || appointmentData.isCancelled){
            return res.status(500).json({ success: false, message: "Appointment cancelled or not found" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{isPaid:true})
        // Create Option for payment
        // const options = {
        //     amount: appointmentData.fees * 100,
        //     currency:process.env.CURRENCY,
        //     receipt: appointmentId
        // }
        // Creation of Order
        // const order = razorPayInstance.orders.create(options);
        
        res.json({success:true,message:"Appointment Paid"})
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



export {registerUser,loginUser,getUserData,updateProfile,bookAppointment,getUserAppointments,cancelUserAppointments,proccedPayment}