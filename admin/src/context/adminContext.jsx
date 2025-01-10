import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"");
    const backend_URL = import.meta.env.VITE_BACKEND_URL

    const value = {
        aToken,
        setAToken,
        backend_URL,
        
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;