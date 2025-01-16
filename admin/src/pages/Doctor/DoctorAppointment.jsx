import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets_admin/assets.js";

const DoctorAppointment = () => {
  const {
    getAppointments,
    appointments,
    dToken,
    markCompleted,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr,2fr,1fr,1fr,3fr,1fr,1fr] gap-2 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr,2fr,1fr,1fr,3fr,1fr,1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.isPaid ? "Online" : "Cash"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
            <p>
              {currency} {item.fees}
            </p>
            {item.isCancelled ? (
              <p className="text-red-500">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500">Completed</p>
            ) : (
              <div className="flex">
                <img
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                  onClick={() => cancelAppointment(item._id)}
                />
                <img
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                  onClick={() => markCompleted(item._id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
