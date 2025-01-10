import { createContext } from "react";
import { useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [dToken,setDToken] = useState('');
    const backend_URL = import.meta.env.VITE_BACKEND_URL

    const value = {
        dToken,
        setDToken,
        backend_URL,
        
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;