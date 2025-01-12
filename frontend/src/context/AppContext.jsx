import { createContext, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$"
    const [doctors,setDoctors] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false );
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [userData,setUserData] = useState(false);
    const [appointmentDoctors,setAppointmentDoctors] = useState([]);

    const getAllDoctors = async () => {

        try {
            
            const { data } = await axios.get(backendURL + "/api/doctor/list");
            if(data.success){
                setDoctors(data.doctors);
                console.log(data.doctors);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendURL + "/api/user/get-user", { headers: { token } });
            // In Axios, the response data is inside the 'data' property, not 'response'
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error('User not found');
            }
        } catch (error) {
            toast.error('Error fetching user data');
            console.error(error);
        }
    };

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendURL + "/api/user/get-user-appointment", { headers: { token } });

            if(data.success){
                console.log(data.appointments); 
                // Extract only the docData from each appointment
                const allDocData = data.appointments.reverse();

                setAppointmentDoctors(allDocData);
            }else {
                toast.error('No Appointments');
            }
            
        } catch (error) {
            toast.error('Error fetching user data');
            console.error(error);
        }
    }
      

    useEffect(() => {
        getAllDoctors();
    },[])

    useEffect(() => {
        if(token){
            getAppointments();
        }
    },[token])

    useEffect(() => {
        if(token){
            getUserData();
        }else{
            setUserData(false);
        }
    },[token])

    const value = {
        doctors,
        currencySymbol,
        backendURL,
        getAllDoctors,
        token,
        setToken,
        getUserData,
        userData,
        setUserData,
        appointmentDoctors,
        getAppointments,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;