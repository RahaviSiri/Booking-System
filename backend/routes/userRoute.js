import express from "express"
import { bookAppointment, getUserAppointments, getUserData, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login-user', loginUser);
userRouter.get('/get-user',authUser,getUserData);
userRouter.post('/update-user', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment',authUser, bookAppointment);
userRouter.get('/get-user-appointment',authUser, getUserAppointments);
getUserAppointments


export default userRouter;
