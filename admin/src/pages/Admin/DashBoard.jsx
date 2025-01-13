import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import { assets } from "../../assets_admin/assets.js";
import { AppContext } from "../../context/appContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const DashBoard = () => {

  const { dashData, getAllAppointments, backend_URL, aToken } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

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
    dashData && (
      <div className="m-5">
        {/* Top Part */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-gray-600 hover:scale-105 transition-all">
            <img src={assets.doctor_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold">{dashData.doctors}</p>
              <p className="text-sm text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-gray-600 hover:scale-105 transition-all">
            <img src={assets.appointments_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold">{dashData.appointments}</p>
              <p className="text-sm text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer text-gray-600 hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold">{dashData.patients}</p>
              <p className="text-sm text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4 mt-10 rounded border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointment</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-300">
                <img
                  src={item.userData.image}
                  alt=""
                  className="rounded-full w-10"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600"> Booking On: {slotDateFormat(item.slotDate)}| {item.slotTime}{" "}
                  </p>
                </div>
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
                      <p className="text-yellow-500 text-xs font-medium">
                        Paid
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DashBoard;
