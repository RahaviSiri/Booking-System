import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex justify-center flex-col md:flex-row gap-12 mb-28 text-sm'>
        {/* Left Side */}
        <img src={assets.contact_image} alt="" className='w-full md:max-w-[360px]'/>
        {/* Right Side */}
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='text-lg text-gray-600 font-semibold'>OUR OFFICE</p>
          <p className='text-gray-500'>54709 Willms Station <br />Suite 350, Washington, USA</p>
          <div>
            <p className='text-gray-500'>Tel: 077 7123 986</p>
            <p className='text-gray-500'>Email: aanchisubas320@gmail.com</p>
          </div>
          <b className='text-lg text-gray-600 font-semibold'>CAREERS AT PRESCRIPTO</b>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact