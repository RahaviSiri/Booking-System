import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/appContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const {
    getDoctorProfile,
    doctorProfile,
    dToken,
    setDoctorProfile,
    backend_URL,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [edit, setEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address:doctorProfile.address,
        available:doctorProfile.available,
        fees:doctorProfile.fees
      }
      const { data } = await axios.post(
        backend_URL + "/api/doctor/update-profile",
        updateData ,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorProfile();
        setEdit(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);

  return (
    doctorProfile && (
      <div className="">
        <div className="flex flex-col gap-4 m-5">
          {/* Image */}
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={doctorProfile.image}
              alt=""
            />
          </div>
          {/* Information */}
          <div className="flex-1 border border-stone-100 rounded-lg bg-white p-8 py-7">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {doctorProfile.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {doctorProfile.speciality} - {doctorProfile.degree}
              </p>
              <button className="px-2 py-0.5 border text-xs rounded-full">
                {doctorProfile.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {doctorProfile.about}
              </p>
            </div>
            <p className="font-medium text-gray-600 mt-4">
              Appointment fees :{" "}
              <span className="text-gray-800">
                {currency} {edit ? <input type="number" onChange={(e) => setDoctorProfile(prev => ({...prev,fees:e.target.value}))} value={doctorProfile.fees}/> : doctorProfile.fees}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {edit ? <input type="text" onChange={(e) => setDoctorProfile(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={doctorProfile.address.line1}/> : doctorProfile.address.line1} <br />{" "}
                {edit ? <input type="text" onChange={(e) => setDoctorProfile(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={doctorProfile.address.line2}/> : doctorProfile.address.line2}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <input
                checked={doctorProfile.available}
                type="checkbox"
                name=""
                id="available"
                onChange={() => edit && setDoctorProfile(prev => ({...prev,available:!prev.available}))}
              />
              <label htmlFor="available">Available</label>
            </div>
            {
              edit ? 
              <button
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              onClick={updateProfile}
            >
              Save
            </button>
            :
            <button
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            } 
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
