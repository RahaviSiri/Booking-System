import React from 'react'
import Login from "./pages/login.jsx"
import NavBar from "./components/navBar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';
import { AdminContext } from "./context/adminContext.jsx"
import SideBar from './components/SideBar.jsx';
import { Routes,Route } from "react-router-dom"
import DashBoard from './pages/Admin/DashBoard.jsx';
import Appointments from './pages/Admin/Appointments.jsx';
import DoctorList from './pages/Admin/DoctorList.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import { DoctorContext } from './context/doctorContext.jsx';
import DoctorAppointment from './pages/Doctor/DoctorAppointment.jsx';
import DoctorDashBoard from './pages/Doctor/DoctorDashBoard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* Admin */}
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<DashBoard/>}/>
          <Route path="/appointments" element={<Appointments/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorList/>}/>
          {/* Doctor */}
          <Route path="/doctor-appointment" element={<DoctorAppointment/>}/>
          <Route path="/doctor-dashboard" element={<DoctorDashBoard/>}/>
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
       <Login/>
       <ToastContainer/>
    </>
  )
}

export default App