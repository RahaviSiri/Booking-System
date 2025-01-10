import React,{ useContext } from 'react'
import { assets } from "../assets_admin/assets"
import { useNavigate, NavLink } from 'react-router-dom'
import { AdminContext } from "../context/adminContext"

const SideBar = () => {

  const {aToken,setAToken}  = useContext(AdminContext);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen border-r bg-white'>
        {
          aToken && (
            <ul className='mt-5 text-[#515151]'>
              <NavLink to={'/admin-dashboard'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink to={'/appointments'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
                <img src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>
              <NavLink to={'/add-doctor'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
                <img src={assets.add_icon} alt="" />
                <p>Add Doctor</p>
              </NavLink>
              <NavLink to={'/doctor-list'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`}>
                <img src={assets.people_icon} alt="" />
                <p>Doctors List</p>
              </NavLink>
            </ul>
          )
        }
    </div>
  )
}

export default SideBar