import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../Context/DoctorContext'

const Navbar = () => {
    const {atoken,setAtoken} = useContext(AdminContext)
    const {dtoken,setDtoken} = useContext(DoctorContext)
    const navigate = useNavigate()


    const logout = ()=>{
        navigate('/')
      atoken && setAtoken('')
      atoken && localStorage.removeItem('atoken')
      dtoken && setDtoken('')
      dtoken && localStorage.removeItem('dtoken')
    }
  return (
    <div className='flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b'>
        <div className='flex items-center gap-2 text-xs '>
            <img className='w-36 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='cursor-pointer border px-2.5 py-0.5 rounded-full text-gray-600 border-gray-500'>{atoken ? 'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>LogOut</button>
    </div>
  )
}

export default Navbar