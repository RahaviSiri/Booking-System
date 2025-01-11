import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext';
import { useEffect } from 'react';

const DoctorList = () => {

  const { doctors,aToken,getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if(aToken){
      getAllDoctors();
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='font-medium text-lg text-neutral-800'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='flex gap-2 items-center text-sm mt-1'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList

// flex-wrap:

// This ensures that child elements will wrap to the next row or column when there is not enough space in the container.
// Without flex-wrap, all child elements would remain in a single row (or column) and overflow the container.