import express from "express"
// To above import make type : module at package.json
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(cors()); // Connect backend with frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Pass arguments in JSON format to backend

// API endpoints
app.get('/',(req,res) => {
    res.send("API is working");
})
app.use('/api/admin',adminRouter) 
// http://localhost/api/admin

// Start App
app.listen(port, () => {
    console.log(`Server is working on Port ${port}`);
})

// "server":"nodemon server.js"
// npm run server
// Automatically start if there are any changes in backend