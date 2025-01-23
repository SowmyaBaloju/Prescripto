import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext'

const DoctorDashboard = () => {
  const {dtoken,dashData,setDashData,getDashData,completeAppointment,cancelAppointment} = useContext(DoctorContext)
  const {currency,slotDateFormat } = useContext(AppContext)

  useEffect(()=>{
if(dtoken){
  getDashData()
}
  },[dtoken])

  return dashData && (
    <div className='m-5'>
          <div className='flex flex-wrap gap-3'>
            <div className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
              <img className='w-14' src={assets.earning_icon} alt="" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
                <p className=' text-gray-400'>Earning</p>
              </div>
            </div >
            <div  className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
              <img className='w-14' src={assets.appointments_icon} alt="" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                <p className='text-gray-400'>Appointments</p>
              </div>
            </div>
            <div  className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
              <img className='w-14' src={assets.patients_icon} alt="" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                <p className='text-gray-400'>Patients</p>
              </div>
            </div>
           
              
          </div>
           <div className='bg-white '>
                    <div className='flex items-center gap-2.5 mt-10 rounded-t border px-4 py-4'>
                      <img src={assets.list_icon} alt="" />
                      <p className='font-semibold'>Latest Bookings</p>
                    </div>
                    <div className='pt-4 border border-t-0'>
                      {dashData.latestAppointments.map((item,index)=>(
                        <div className='flex items-center cursor-pointer px-6 py-3  gap-3 hover:bg-gray-100' key={index}>
                           <img className='rounded-full w-10' src={item.userData.image} alt="" />
                           <div className='flex-1 text-sm '>
                            <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                            <p className='text-gray-800' >{item.slotDate}</p>
                           </div>
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
                      ))}
                    </div>
                  </div>
         
    
        </div>
  )
}

export default DoctorDashboard