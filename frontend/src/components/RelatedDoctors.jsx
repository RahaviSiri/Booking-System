import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const [relDoc,setRelDoc] = useState([]);

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((docs) => docs.speciality.toLowerCase() === speciality.toLowerCase() && docs._id !== String(docId))
            setRelDoc(doctorsData);
        }
    },[docId,speciality,doctors])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/2 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0,5).map((item,index) => (
                    <div key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' onClick={() => {navigate(`/doctor-appointment/${item._id}`),scrollTo(0,0)}}>
                        <img src={item.image} alt="" className='bg-blue-50'/>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 rounded-full bg-green-500'></p>
                                <p className=''>Available</p>
                            </div>
                            <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                            <p className='text-sm text-gray-600'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div> 
            <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-100 text-gray-600 px-12 py-3 mt-10 rounded-full'>More</button>
        </div>
    )
}

export default RelatedDoctors