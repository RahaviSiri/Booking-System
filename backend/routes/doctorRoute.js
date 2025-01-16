import express from "express"
import { allDoctors,doctorLogin,getAppointments,markCompleted,cancelAppointment } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";


const doctorRouter = express.Router();

doctorRouter.get('/list', allDoctors);
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/get-appointments',authDoctor,getAppointments);
doctorRouter.post('/mark-complete', authDoctor,markCompleted);
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment);

export default doctorRouter;
