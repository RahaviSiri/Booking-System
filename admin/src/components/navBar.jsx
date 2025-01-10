import React,{ useContext } from 'react'
import { assets } from "../assets_admin/assets"
import { useNavigate } from 'react-router-dom'
import { AdminContext } from "../context/adminContext"

const navBar = () => {

  const {aToken,setAToken}  = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    if(aToken){
      navigate('/');
      setAToken('');
      localStorage.removeItem('aToken');
    }
  }

  return (
    <div className='flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center text-xs gap-2'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border rounded-full px-2.5 py-0.5 border-gray-500 text-gray-600'>{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white rounded-full px-10 py-2 text-sm'> Logout </button>
    </div>
  )
}

export default navBar