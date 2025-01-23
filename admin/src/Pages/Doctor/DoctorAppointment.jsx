// import React from 'react'
// import { useContext } from 'react'
// import { DoctorContext } from '../../Context/DoctorContext'
// import { useEffect } from 'react'
// import { AppContext } from '../../Context/AppContext'
// import { assets } from '../../assets/assets'

// const DoctorAppointment = () => {
//   const {dtoken,appointments,getAppointments,completeAppointment,cancelAppointment} = useContext(DoctorContext)
//   const {calculateAge,slotDateFormat,currency} = useContext(AppContext)
//   useEffect(()=>{
//     if(dtoken){
//            getAppointments()
//     }
//   },[dtoken])
//   return (
//     <div className='w-full m-5 max-w-6xl'>
//      <p className='text-lg mb-3 font-medium'>All Appointments</p>
//      <div className='bg-white border rounded text-sm max-f-[80vh] min-h-[50vh] overflow-y-scroll'>
//       <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//         <p>#</p>
//         <p>Patient</p>
//         <p>Payment</p>
//         <p>Age</p>
//         <p>Date & Time</p>
//         <p>Fees</p>
//         <p>Action</p>
//       </div>
//       {
//         appointments.map((item,index)=>(
//           <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 cursor-pointer' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2 '>
//               <img className='rounded-full w-8' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p className='text-xs inline border border-primary hover:bg-primary hover:text-white px-2 rounded-full'>
//                 {item.payment ? 'Online' : 'Cash'}
//               </p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
//             <p>{currency}{item.amount}</p>
//             <div className='flex'>
//               <img onClick={()=>cancelAppointment(item._id)}  className='hover:bg-red-500 rounded-full w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//               <img onClick={()=>completeAppointment(item._id)} className='hover:bg-green-500 rounded-full w-10 cursor-pointer ' src={assets.tick_icon} alt="" />
//             </div>
//           </div>
//         ))
//       }
//      </div>
//     </div>
//   )
// }

// export default DoctorAppointment


import React, { useEffect, useState, useContext } from 'react';
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dtoken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dtoken) {
      setLoading(true);
      getAppointments().finally(() => setLoading(false));
    }
  }, [dtoken]);

  if (loading) {
    return <div className="text-center py-10">Loading appointments...</div>;
  }

  return (
    <div className="w-full m-5 max-w-6xl">
      <p className="text-lg mb-3 font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-f-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No appointments available.</div>
        ) : (
          appointments.reverse().map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 cursor-pointer"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2 ">
                <img className="rounded-full w-8" src={item.userData.image} alt={item.userData.name} />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className="text-xs inline border border-primary hover:bg-primary hover:text-white px-2 rounded-full">
                  {item.payment ? 'Online' : 'Cash'}
                </p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? <p className='text-red-400 font-medium text-sm'>Cancelled</p> : item.isCompleted ? <p className='text-green-400 font-medium text-sm'>Completed</p> : <div className="flex">
                <img
                  onClick={() => {
                    if (item._id && typeof item._id === 'string' && item._id.length === 24) {
                      cancelAppointment(item._id);
                    } else {
                      console.error('Invalid ObjectId:', item._id);
                    }
                  }}
                  className="hover:bg-red-500 rounded-full w-10 cursor-pointer"
                  src={assets.cancel_icon}


                />
                <img
                  onClick={() => {
                    if (item._id && typeof item._id === 'string' && item._id.length === 24) {
                      completeAppointment(item._id);
                    } else {
                      console.error('Invalid ObjectId:', item._id);
                    }
                  }}
                  className="hover:bg-green-500 rounded-full w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete Appointment"
                  aria-label="Complete Appointment"
                />
              </div>}

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
