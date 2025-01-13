import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const {
    appointmentDoctors,
    backendURL,
    token,
    getAppointments,
    getAllDoctors,
  } = useContext(AppContext);

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Api",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);

      const { data } = await axios.post(
        backendURL + "/api/user/cancel-user-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const paymentProceed = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/user/proceed-payment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        getAppointments();
      } else {
        toast.error("Error Occured in Payment Proceed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="my-10">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div className="gap-10">
        {appointmentDoctors && appointmentDoctors.length > 0 ? (
          appointmentDoctors.map(
            (item, index) =>
              !item.isCancelled && (
                <div
                  className="grid grid-cols-[1fr,2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                  key={index}
                >
                  <div>
                    <img
                      src={item.docData.image}
                      alt=""
                      className="w-32 bg-indigo-50"
                    />
                  </div>
                  <div className="flex-1 text-sm text-zinc-600">
                    <p className="text-neutral-800 text-semibold">
                      {item.docData.name}
                    </p>
                    <p>{item.speciality}</p>
                    <p className="text-zinc-800 font-semibold mt-1">Address:</p>
                    <p className="text-xs">{item.docData.address.line1}</p>
                    <p className="text-xs">{item.docData.address.line2}</p>
                    <p className="mt-1 text-xs">
                      <span className="text-zinc-800 font-medium text-sm">
                        Date & Time:{" "}
                      </span>
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>
                  <div></div>
                  <div className="flex flex-col gap-2 justify-end">
                    <button
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all"
                      onClick={
                        item.isPaid ? null : () => paymentProceed(item._id)
                      }
                    >
                      {item.isPaid ? "Paid" : "Pay Online"}
                    </button>
                    {!item.isPaid && (
                      <button
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        Cancel appointment
                      </button>
                    )}
                  </div>
                </div>
              )
          )
        ) : (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
