import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"");
    const backend_URL = import.meta.env.VITE_BACKEND_URL

    const [doctors,setDoctors] = useState([]);
    const [appointments,setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false);
    // const [availability,setAvailability] = useState([]);

    const getAllDoctors = async () => {

        try {
            const { data } = await axios.post(backend_URL + "/api/admin/all-doctors",{},{headers:{aToken}});
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

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backend_URL + "/api/admin/change-availability",{docId},{headers:{aToken}});
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {

        try {
    
          const { data } = await axios.get(backend_URL + "/api/admin/all-appointments" , {headers:{aToken}});
    
          if(data.success){
            setAppointments(data.appointments)
          }else{
            toast.error("Error in Fetching");
          }
          
        } catch (error) {
          toast.error(error.message);
        }
    }

    const getDashData = async () => {

        try {

            const { data } = await axios.get(backend_URL + "/api/admin/user-dashboard-data",{headers:{aToken}});

            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
            }else{
                toast.error("Error in Fetching");
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(aToken){
            getAllAppointments();
            getDashData();
        }
    },[aToken])

    const value = {
        aToken,
        setAToken,
        backend_URL,
        getAllDoctors,
        doctors,
        setDoctors,
        changeAvailability,
        getAllAppointments,
        appointments,
        setAppointments,
        dashData,
        
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;