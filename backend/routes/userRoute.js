import express from "express"
import { getUserData, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login-user', loginUser);
userRouter.get('/get-user',authUser,getUserData);
userRouter.post('/update-user', upload.single('image'), authUser, updateProfile);

export default userRouter;
