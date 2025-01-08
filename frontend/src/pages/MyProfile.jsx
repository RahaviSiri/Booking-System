import React,{ useState } from 'react'
import { assets } from "../assets/assets"

const MyProfile = () => {

  const [userData,setUserData] = useState({
    name:"Rahavi",
    image:assets.profile_pic,
    email:"rahavi24siri@gmail.com",
    phone:"0740 902 539",
    address:{
      line1:'359/35A, Nallur',
      line2:'Koyil Road,Jaffna'
    },
    gender:"Female",
    dob:"2002-11-04"
  })

  const [isEdit,setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm my-12'>
      <img src={userData.image} alt="" className='w-36 rounded'/>
      {
        isEdit ? 
        <input type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 p-2'/> 
        : 
        <p className='text-neutral-800 text-3xl font-medium mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 border-none h-[1px]'/>
      <div>
        <p className='text-neutral-500 mt-3 underline'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr,3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ? 
            <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} className='bg-gray-50 font-medium max-w-52 p-2'/> 
            : 
            <p className='text-blue-500'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit ? 
            <p>
              <input type="text" onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} className='bg-gray-50 font-medium max-w-52 p-2'/>
              <br />
              <input type="text" onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={userData.address.line2} className='bg-gray-50 font-medium max-w-52 p-2'/>
            </p>
            :
            <p className='font-medium text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 mt-3 underline'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr,3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit ? 
            <select className='max-w-20 bg-gray-100 p-2' onChange={e => setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : 
            <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit ? 
            <input type="date" onChange={e => setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob} className='bg-gray-50 font-medium max-w-52 p-2'/>
            :
            <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit ? 
          <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save information</button>
          :
          <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile