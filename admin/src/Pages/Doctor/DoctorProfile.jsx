import React, {  useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData,backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)


  const updateProfile = async ()=>{
try {
  const updateData = {
    address :profileData.address,
    fees:profileData.fees,
    available:profileData.available
  }
  const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dtoken}})
  if(data.success){
    toast.success(data.message)
    setIsEdit(false)
    getProfileData()
  }else{
    toast.error(data.message)
  }
} catch (error) {
   toast.error(error.message)
   console.log(error)
}
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData()
    }
  }, [dtoken])
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='w-64 bg-primary/80 rounded-lg sm:max-w-64' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/*-----Doc Info:name,degree,experience--------- */}

          <p className='font-medium gap-2 text-3xl flex items-center text-gray-700'>{profileData.name}</p>
          <div>
            <p className=' flex items-center mt-1 gap-2 text-gray-600'>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          {/* ---------------About Doc----------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About : </p>
            <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{profileData.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment Fee : <span className='text-gray-800'>{currency}{isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} name="" id="" /> : profileData.fees}</span></p>
          <div>
            <p className=' flex gap-2 py-2 text-gray-600 font-medium'>Address :</p>
            <p className='text-sm'>{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev, address, line1: e.target.value } }))} value={profileData.address.line1} name="" id="" /> : profileData.address.line1} <br /> {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev, address, line1: e.target.value } }))} value={profileData.address.line2} name="" id="" /> : profileData.address.line2}</p>

          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev =>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
            <label htmlFor="Available">Available</label>
          </div>
          {
            isEdit ?
            <button onClick={updateProfile} className=' mt-4 px-4 py-2 border border-primary hover:bg-primary hover:text-white transition-all rounded-lg'>Save</button>
            :  <button onClick={() => setIsEdit(true)} className=' mt-4 px-4 py-2 border border-primary hover:bg-primary hover:text-white transition-all rounded-lg'>Edit</button>
          }
          
         
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile