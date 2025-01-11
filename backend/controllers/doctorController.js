import doctorModel from "../models/doctorModel.js"


const changeAvailability = async (req,res) => {

    try {

        const { docId } = req.body;
        const doctor = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!doctor.available})
        res.json({success: true, message:"Availability Changes"});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

// Get all doctors details
const allDoctors = async (req, res) => {
    try {
      const doctors = await doctorModel.find({}).select(['-password','-email'])
      res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {changeAvailability,allDoctors}