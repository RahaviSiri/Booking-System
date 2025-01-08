import React, { useContext, useEffect, useState } from 'react'
import { useParams  } from "react-router-dom"
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const DoctorAppointment = () => {

  const { docId } = useParams();
  const { doctors,currencySymbol } = useContext(AppContext);
  const [selectedDoctor,setSelectedDoctor] = useState(null);
  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0);
  const [slotTime,setSlotTime] = useState('');

  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const doctorInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setSelectedDoctor(doctor);
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    // get current date
    let today = new Date();

    for(let i = 0; i < 7; i++){
      // Starting time 10am
      // Get current date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time of date with index
      // Before 9pm
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      // Setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        timeSlots.push({
          date: new Date(currentDate),
          time: formattedTime
        })

        // Increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev,timeSlots]));
    }
  }

  useEffect(() => {
    doctorInfo();
  },[docId,doctors])

  useEffect(() => {
    getAvailableSlots();
  }, []);

  return (
    <div className='mb-5'>
      {
        selectedDoctor ? 
        (
          <div className='flex flex-col sm:flex-row gap-4'>
            {/* Left Side */}
            <div>
              <img className='w-full bg-primary sm:max-w-72 rounded-lg' src={selectedDoctor.image} alt="" />
            </div>

            {/* Right Side */}
            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
              <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                {selectedDoctor.name} <img className='w-5' src={assets.verified_icon} alt="" />
              </p>
              <div className='flex items-center gap-2 text-sm mt-1 text-gray-900'>
                <p>{selectedDoctor.degree} - {selectedDoctor.speciality}</p>
                <button className='py-0.5 px-2 text-xs border rounded-full'>{selectedDoctor.experience}</button>
              </div>
              <div>
                <p className='flex items-center gap-1 text-sm mt-3 font-medium text-gray-900'>About <img src={assets.info_icon} alt="" /></p>
                <p className='text-sm text-gray-500 mt-1 max-w-[700px]'>{selectedDoctor.about}</p>
              </div>
              <p className='mt-4 text-gray-500 font-medium'>Appointment Fee: <span className='text-gray-600'>{currencySymbol}{selectedDoctor.fees}</span></p>
            </div>
          </div>
        ) : (
          <div>
            <p className='mt-4 text-gray-500 font-medium text-center'>Select the Doctor</p>
          </div>
        )
      }
      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full mt-4 overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((item,index) => (
              <div onClick={() => setSlotIndex(index)} key={index} className={`border text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : ''}`}>
                <p>{item[0] && daysOfWeek[item[0].date.getDay()]}</p>
                <p>{item[0] && item[0].date.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex gap-3 items-center w-full mt-4 overflow-x-scroll'>
          {
            docSlots.length && docSlots[slotIndex].map((item,index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border ${item.time === slotTime ? 'bg-primary text-white' : ''}`} key={index}>
                { item.time.toLowerCase() }
              </p>
            ))
          }
        </div>
        <button className='bg-primary text-white rounded-full text-sm font-light px-14 py-3 my-6'>Book an appointment</button>
      </div>
      {selectedDoctor && (
        <RelatedDoctors docId={docId} speciality={selectedDoctor.speciality} />
      )}
    </div>
  )
}

export default DoctorAppointment