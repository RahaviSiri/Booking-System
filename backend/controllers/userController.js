import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import {v2 as cloudinary} from "cloudinary"

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

export {registerUser,loginUser,getUserData,updateProfile}