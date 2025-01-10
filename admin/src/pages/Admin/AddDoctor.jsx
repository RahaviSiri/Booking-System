import React from 'react'
import { assets } from "../../assets_admin/assets"
import { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from "../../context/adminContext"
import axios from 'axios';
import { toast } from "react-toastify";

const AddDoctor = () => {

  const [image,setImage] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [experince,setExperince] = useState('1 Year');
  const [fees,setFees] = useState('');
  const [speciality,setSpeciality] = useState('Select One');
  const [education,setEducation] = useState('');
  const [address1,setAddress1] = useState('');
  const [address2,setAddress2] = useState('');
  const [about,setAbout] = useState('');

  const { aToken,backend_URL } = useContext(AdminContext);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      if(!image){
        return toast.error("Upload the Image");
      }
      const formData = new FormData();
      formData.append('image',image);
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('experience',experince);
      formData.append('fees',Number(fees));
      formData.append('speciality',speciality);
      formData.append('degree',education);
      formData.append('about',about);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));

      const { data } = await axios.post(backend_URL + '/api/admin/add-doctor',formData, {headers:{aToken}});

      if(data.success){
        toast.success(data.message);
        setImage(false);
        setName('');
        setEmail('');
        setPassword('');
        setFees('');
        setEducation('');
        setAbout('');
        setAddress1('');
        setAddress2('');
      }else{
        toast.error(data.message);
      }


    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <form className='w-full m-5' onSubmit={handleSubmit}>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 cursor-pointer rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          {/* ID to when i touch image input filed shoud open */}
          <input onChange={(e) => setImage(e.target.files[0]) } type="file" hidden id='doc-img'/>
          <p>Upload <br /> doctor picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          {/* Left Side */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input className='border rounded px-3 py-2 outline-primary' type="text" placeholder='Name' required onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input className='border rounded px-3 py-2 outline-primary' type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input className='border rounded px-3 py-2 outline-primary' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select className='border rounded px-3 py-2 outline-primary' name="" id="" onChange={(e) => setExperince(e.target.value)} value={experince}>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Doctor Fees</p>
              <input className='border rounded px-3 py-2 outline-primary' type="number" placeholder='Fees' required onChange={(e) => setFees(e.target.value)} value={fees}/>
            </div>

          </div>

          {/* Right Side */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2 outline-primary' name="" id="" onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                <option value="Select One">Select One</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input className='border rounded px-3 py-2 outline-primary' type="text" placeholder='Education' required onChange={(e) => setEducation(e.target.value)} value={education}/>
            </div>
            <div className='lg:flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input className='border rounded px-3 py-2 outline-primary' type="text" placeholder='Address 1' required onChange={(e) => setAddress1(e.target.value)} value={address1}/>
              <input className='border rounded px-3 py-2 outline-primary' type="text" placeholder='Address 2' required onChange={(e) => setAddress2(e.target.value)} value={address2}/>
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className='mt-4 mb-2 text-gray-600'>
            <p className='mb-2'>About me</p>
            <textarea className='border rounded px-4 pt-2 outline-primary w-full' rows={5} type="text" required placeholder='Write about yourself' onChange={(e) => setAbout(e.target.value)} value={about}/>
        </div>
        <button type='submit' className='bg-primary text-white px-10 py-3 mt-4 rounded-full'>Add doctor</button>

      </div>
    </form>
  )
}

export default AddDoctor