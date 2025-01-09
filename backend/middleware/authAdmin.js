import jwt from "jsonwebtoken"

// Admin Authentication Middleware
const authAdmin = async (req,res,next) => {

    try {
        const { atoken }  = req.headers;
        if(!atoken){
            return res.json({success: false, message:"Not authorrized login again"});
        }

        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
            return res.json({success: false, message:"Not valid token"});
        }

        next();
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export default authAdmin