import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../Context/DoctorContext.jsx';

const Login = () => {
  const [state,setState] = useState('Admin')
  const {setAtoken,backendUrl} = useContext(AdminContext)
  const {setDtoken}= useContext(DoctorContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    try {
      if(state==='Admin'){
        const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('atoken',data.token)
         setAtoken(data.token)
        }else{
          toast.error(data.message)
        }

      }else{
        const {data}  = await axios.post(backendUrl+'/api/doctor/login',{email,password})
        if(data.success){
          localStorage.setItem('dtoken',data.token)
         setDtoken(data.token)
         console.log(data.token)
        }else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login. Please try again.");
    }
    

  }
  

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg' >
        <p className='text-2xl m-auto font-semibold'><span className='text-primary'>{state}</span> LogIn </p>
        <div className='w-full'>
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded-full p-2 mt-1' type="password" required />
        </div>
        <button className='w-full py-2 bg-primary text-white text-base rounded-lg '>Log In</button>
          {
            state ==='Admin' ? <p>Doctor Login ? <span className='cursor-pointer text-primary underline'   onClick={()=>setState('Doctor')}>Click Here</span></p> : <p>Admin Login ? <span className='cursor-pointer text-primary underline' onClick={()=>setState('Admin')}>Click Here</span></p> 
          }
      </div>
      
    </form>
  )
}

export default Login