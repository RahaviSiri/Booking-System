import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

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

export {registerUser,loginUser}