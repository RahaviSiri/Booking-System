import React from 'react'
import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col md:grid grid-cols-[3fr,1fr,1fr] gap-14 my-10 mt-4 text-sm'>
        {/* Start Section */}
        <div>
          <img src={assets.logo} alt="" className='mb-5 w-40'/>
          <p className='w-full md:w-2/3 leading-6 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        {/* Center Section */}
        <div>
          <h1 className='text-xl font-medium mb-5'>COMPANY</h1>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* End Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>077 7123 986</li>
            <li>subasaanchikan320@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copy Right */}
      <div>
        <hr />
        <p className='text-sm text-center py-5 text-gray-600'>Copyright © 2024 Rahavi Sirithar - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer