import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/adminContext';
import { AppContext } from '../../context/appContext';
import { assets } from "../../assets_admin/assets.js";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { appointments, getAllAppointments, backend_URL, aToken } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_URL + "/api/admin/cancel-appointments",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="text-lg font-medium mb-3">All Appointments</p>
      <div className="bg-white border rounded text-sm overflow-y-scroll max-h-[80vh] min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr,3fr,1fr,3fr,3fr,1fr,1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient: </p>
          <p>Age: </p>
          <p>Date & Time: </p>
          <p>Doctor: </p>
          <p>Fees: </p>
          <p>Action: </p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr,3fr,1fr,3fr,3fr,1fr,1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userData.image} alt="" className="w-8 rounded-full" />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img src={item.docData.image} alt="" className="w-8 rounded-full bg-gray-200" />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.fees}</p>
            {item.isCancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <>
                {!item.isPaid ? (
                  <img
                    src={assets.cancel_icon}
                    alt="Cancel Icon"
                    className="w-10 cursor-pointer"
                    onClick={() => cancelAppointment(item._id)}
                  />
                ) : (
                  <p className="text-yellow-500 text-xs font-medium">Paid</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
