import express from "express"
import { addDoctor, loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin , upload.single('image') ,addDoctor);
// Multer calls these callbacks internally while processing the file, so you don’t see them directly in upload.single('image'). They run automatically when the file is uploade.
adminRouter.post('/login-admin',loginAdmin);

export default adminRouter;

// Middleware: upload.single('image')
// This is the multer middleware responsible for handling the file upload.
// single('image'):
// Specifies that the request will include a single file in the field named image.
// Multer will process this file, store it (based on the configuration in multer.js), and attach its metadata to req.file.

