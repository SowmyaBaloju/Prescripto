import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [state,setState] = useState('Sign Up')
  const [ email, setEmail] = useState(' ')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const {token,setToken,backendUrl} = useContext(AppContext)
  const navigate = useNavigate()

const onSubmitHandler = async (event)=>{
  event.preventDefault()
  try {
   if(state==='Sign Up'){
    const {data} = await axios.post(backendUrl+ '/api/user/register',{name,password,email})
    if(data.success){
      localStorage.setItem('token',data.token)
      setToken(data.token)
    }else{
      toast.error(data.mesessage)
    }
   } else{
    const {data} = await axios.post(backendUrl+ '/api/user/login',{name,password,email})
    if(data.success){
      localStorage.setItem('token',data.token)
      setToken(data.token)
    }else{
      toast.error(data.mesessage)
    }
    
   }
  } catch (error) {
    console.log(error)
    toast.error(error.mesessage)
    
  }
}
useEffect(()=>{
  if(token){
    navigate('/')
  }

},[token])


  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' action="">
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg text-zinc-600'>
      <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Log In"}</p>
      <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book and appointment</p>
      {
        state==='Sign Up' && <div className='w-full '>
        <p>Full Name</p>
        <input className='border border-black rounded-full p-2 mt-1' type="text" name="" id=""  onChange={(e)=>setName(e.target.value)} value={name} required/>
      </div>
      }
      
      <div className='w-full '>
        <p>Email</p>
        <input className='border border-black rounded-full p-2 mt-1' type="email" name="" id=""  onChange={(e)=>setEmail(e.target.value)} value={email} required/>
      </div>
      <div className='w-full '>
        <p>Password</p>
        <input className='border border-black rounded-full p-2 mt-1' type="password" name="" id=""  onChange={(e)=>setPassword(e.target.value)} value={password} required/>
      </div>
      <button type='submit' className='bg-primary mt-5 text-white px-10 py-3 rounded-lg w-full'>{state === 'Sign Up' ? "Create Account" : "Log In"}</button>
      {
        state === 'Sign Up'? <p>Already Have an account ? <span onClick={()=>setState('Log In')} className='text-primary underline cursor-pointer'>Login Here</span></p> : <p>Create a New Account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click Here</span></p>
      }
    </div>

   </form>
  )
}

export default Login