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

    useEffect(() => {
        getAllDoctors();
    },[])

    const value = {
        doctors,
        currencySymbol,
        backendURL,
        getAllDoctors,
        token,
        setToken,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;