import React, { useContext } from 'react'
import { AppContext } from "../context/AppContext"

const MyAppointments = () => {

  const { doctors } = useContext(AppContext);

  return (
    <div className='my-10'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div className='gap-10'>
        {
          doctors.slice(0,2).map((item,index) => (
            <div className='grid grid-cols-[1fr,2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img src={item.image} alt="" className='w-32 bg-indigo-50'/>
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 text-semibold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-800 font-semibold mt-1'>Address:</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='mt-1 text-xs'><span className='text-zinc-800 font-medium text-sm'>Date & Time: </span>25, July, 2024 |  8:30 PM</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all'>Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all'>Cancel appointment</button>
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments