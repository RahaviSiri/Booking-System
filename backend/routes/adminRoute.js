import express from "express"
import { getDashBoardData,addDoctor, allDoctors, loginAdmin,getAllAppoiintment, cancelUserAppointments  } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin , upload.single('image') ,addDoctor);
// Multer calls these callbacks internally while processing the file, so you don’t see them directly in upload.single('image'). They run automatically when the file is uploade.
adminRouter.post('/login-admin',loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/all-appointments', authAdmin, getAllAppoiintment);
adminRouter.post('/cancel-appointments', authAdmin, cancelUserAppointments);
adminRouter.get('/user-dashboard-data', authAdmin, getDashBoardData);

export default adminRouter;

// Middleware: upload.single('image')
// This is the multer middleware responsible for handling the file upload.
// single('image'):
// Specifies that the request will include a single file in the field named image.
// Multer will process this file, store it (based on the configuration in multer.js), and attach its metadata to req.file.

