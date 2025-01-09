import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"

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

export { addDoctor,loginAdmin }