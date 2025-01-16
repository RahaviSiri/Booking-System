import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify"
import axios from "axios"

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):"");
    const backend_URL = import.meta.env.VITE_BACKEND_URL
    const [appointments,setAppointments] = useState([]);
    const [dashboardData,setDashboardData] = useState(false);
    const [doctorProfile,setDoctorProfile] = useState(false);

    const getAppointments = async () => {
        try {

            const { data } = await axios.get(backend_URL + "/api/doctor/get-appointments", {headers:{dToken}});
            if(data.success){
                setAppointments(data.doctorAppointment.reverse());
                console.log(data.doctorAppointment.reverse());
            }else{
                toast.error("Error to Fetch");
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backend_URL + "/api/doctor/cancel-appointment",{appointmentId} ,{headers:{dToken}});
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }else{
                console.log(data.message)
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
        }
    }

    const markCompleted = async (appointmentId) => {
        try {

            const { data } = await axios.post(backend_URL + "/api/doctor/mark-complete", {appointmentId} ,{headers:{dToken}});
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }else{
                console.log(data.message)
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
        }
    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backend_URL + "/api/doctor/get-data",{headers:{dToken}});
            if(data.success){
                setDashboardData(data.dashData);
            }else{
                toast.error("Error Fetching");
            }
            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
        }
    }

    const getDoctorProfile = async () => {
        try {

            const { data } = await axios.get(backend_URL + "/api/doctor/doctor-profile",{headers:{dToken}});
            if(data.success){
                setDoctorProfile(data.doctor);
            }else{
                toast.error("Error Fetching");
            }
            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
        }
    }

    const value = {
        dToken,
        setDToken,
        backend_URL,
        getAppointments,
        appointments,
        markCompleted,
        cancelAppointment,
        getDashData,
        dashboardData,
        getDoctorProfile,
        doctorProfile,
        setDoctorProfile,
        
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;