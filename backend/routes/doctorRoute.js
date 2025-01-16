import express from "express"
import { updateDetails,doctorDetails,getDataDashBoard,allDoctors,doctorLogin,getAppointments,markCompleted,cancelAppointment } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";


const doctorRouter = express.Router();

doctorRouter.get('/list', allDoctors);
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/get-appointments',authDoctor,getAppointments);
doctorRouter.post('/mark-complete', authDoctor,markCompleted);
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment);
doctorRouter.get('/get-data',authDoctor,getDataDashBoard);
doctorRouter.get('/doctor-profile',authDoctor,doctorDetails);
doctorRouter.post('/update-profile',authDoctor,updateDetails);

export default doctorRouter;
