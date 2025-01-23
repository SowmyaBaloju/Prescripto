// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../Context/AdminContext'
// import { useEffect } from 'react'
// import { assets } from '../../assets/assets'

// const Dashboard = () => {
//     const {atoken,dashData,getDashData,cancelAppoinment} = useContext(AdminContext)

//     useEffect(()=>{
// if(atoken){
//   getDashData()
// }
//     },[atoken])

//   return dashData && (
    // <div className='m-5'>
    //   <div className='flex flex-wrap gap-3'>
    //     <div className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    //       <img className='w-14' src={assets.doctor_icon} alt="" />
    //       <div>
    //         <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
    //         <p className='text-xl font-semibold text-gray-600'>Doctors</p>
    //       </div>
    //     </div >
    //     <div  className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    //       <img className='w-14' src={assets.appointments_icon} alt="" />
    //       <div>
    //         <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
    //         <p className='text-xl font-semibold text-gray-600'>Appointments</p>
    //       </div>
    //     </div>
    //     <div  className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    //       <img className='w-14' src={assets.patients_icon} alt="" />
    //       <div>
    //         <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
    //         <p className='text-xl font-semibold text-gray-600'>Patients</p>
    //       </div>
    //     </div>
        // <div className='bg-white '>
        //   <div className='flex items-center gap-2.5 mt-10 rounded-t border px-4 py-4'>
        //     <img src={assets.list_icon} alt="" />
        //     <p className='font-semibold'>Latest Bookings</p>
        //   </div>
        //   <div className='pt-4 border border-t-0'>
        //     {dashData.latestAppointments.map((item,index)=>(
        //       <div className='flex items-center cursor-pointer px-6 py-3  gap-3 hover:bg-gray-100' key={index}>
        //          <img className='rounded-full w-10' src={item.docData.image} alt="" />
        //          <div className='flex-1 text-sm '>
        //           <p className='text-gray-800 font-medium'>{item.docData.name}</p>
        //           <p className='text-gray-800' >{item.slotDate}</p>
        //          </div>
        //          {item.cancelled ?
        //                      <p className='text-red-400 text-xs font-medium'>Cancelled</p> :
        //                         <img onClick={()=>cancelAppoinment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                             
        //                    }
        //       </div>
        //     ))}
        //   </div>
        // </div>
    //   </div>
     

    // </div>
//   )
// }

// export default Dashboard



import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';

const Dashboard = () => {
    const { atoken, dashData, getDashData, cancelAppoinment } = useContext(AdminContext);
     const {slotDateFormat} = useContext(AppContext)
    useEffect(() => {
        if (atoken) {
            getDashData();
        }
    }, [atoken]);

    return dashData && (
        <div className="m-5">
            <div className="flex flex-wrap gap-6">
                {/* Doctors */}
                <div className="flex items-center bg-white gap-4 p-6 min-w-[200px] shadow-sm rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-transform">
                    <img className="w-14" src={assets.doctor_icon} alt="Doctor Icon" />
                    <div>
                        <p className="text-2xl font-bold text-gray-700">{dashData.doctors}</p>
                        <p className="text-lg text-gray-500">Doctors</p>
                    </div>
                </div>

                {/* Appointments */}
                <div className="flex items-center bg-white gap-4 p-6 min-w-[200px] shadow-sm rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-transform">
                    <img className="w-14" src={assets.appointments_icon} alt="Appointments Icon" />
                    <div>
                        <p className="text-2xl font-bold text-gray-700">{dashData.appointments}</p>
                        <p className="text-lg text-gray-500">Appointments</p>
                    </div>
                </div>

                {/* Patients */}
                <div className="flex items-center bg-white gap-4 p-6 min-w-[200px] shadow-sm rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-transform">
                    <img className="w-14" src={assets.patients_icon} alt="Patients Icon" />
                    <div>
                        <p className="text-2xl font-bold text-gray-700">{dashData.patients}</p>
                        <p className="text-lg text-gray-500">Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest Bookings */}
            <div className="bg-white mt-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 bg-gray-100 rounded-t-lg px-6 py-4 border-b">
                    <img src={assets.list_icon} alt="List Icon" />
                    <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
                </div>
                <div className="pt-4 border-t">
                    {dashData.latestAppointments.map((item, index) => (
                        <div className="flex items-center px-6 py-3 gap-4 hover:bg-gray-50 transition" key={index}>
                            <img className="rounded-full w-12 h-12 object-cover" src={item.docData.image} alt="Doctor" />
                            <div className="flex-1 text-sm">
                                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                            </div>
                             {item.cancelled ?
                                        <p className='text-red-400 text-xs font-medium'>Cancelled</p> :
                                         item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={()=>cancelAppoinment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                        
                                      }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
