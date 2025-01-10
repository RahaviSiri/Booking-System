import React from 'react'
import { assets } from "../assets_admin/assets"
import { useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from "../context/adminContext"
import axios from "axios"
import { toast } from "react-toastify";

const login = () => {

  const [state,setState] = useState('Admin');

  const { setAToken,backend_URL } = useContext(AdminContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (event) =>{

    event.preventDefault();

    try {

      if(state === "Admin"){
        const { data } = await axios.post(backend_URL + "/api/admin/login-admin",{email,password});
        if(data.success){
          setAToken(data.token);
          localStorage.setItem('aToken',data.token);
          setEmail('');
          setPassword('');
        }else{
          toast.error(data.message);
        }
      }else{

      }

    } catch (error) {
      
    }

  }

  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-xl'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span> {' '}{' '}
          Login
        </p>
        <div className='w-full'>
          <p className=''>Email:</p>
          <input type="email" required className='border border-[#DADADA] rounded w-full p-2 mt-1' onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <div className='w-full'>
          <p>Password:</p>
          <input type="password" required className='border border-[#DADADA] rounded w-full p-2 mt-1' onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <button className='bg-primary text-white text-base py-2 w-full rounded-md'>Login</button>
        {
          state === "Admin"
          ? <p className='mt-1'>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState("Doctor")}>Click Here</span></p>
          :
          <p className='mt-1'>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState("Admin")}>Click Here</span></p>
        }
      </div>
    </form>
  )
}

export default login