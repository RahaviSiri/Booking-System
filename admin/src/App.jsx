import React from 'react'
import Login from "./pages/login.jsx"
import NavBar from "./components/navBar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';
import { AdminContext } from "./context/adminContext.jsx"


const App = () => {

  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <NavBar/>
    </div>
  ) : (
    <>
       <Login/>
       <ToastContainer/>
    </>
  )
}

export default App