import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"

const Banner = () => {

    const navigate = useNavigate();

    return (
        <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
            {/* Left Side */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    <p>Book Appointment</p>
                    <p>With 100+ Trusted Doctors</p>
                </div>
                <button className='bg-white text-gray-600 text-sm sm:text-base rounded-full px-8 py-3 mt-6 hover:scale-105 transition-all duration-500' onClick={() => {navigate('/login'); scrollTo(0,0)}}>Create Account</button>
            </div>

            {/* Right Side */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img src={assets.appointment_img} alt="" className='w-full absolute bottom-0 h-auto rounded-lg max-w-md' />
            </div>
        </div>
    )
}

export default Banner