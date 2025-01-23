import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* -----Left--------- */}
            <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eaque sequi. Aut, at voluptatem molestias esse eaque necessitatibus officia deserunt suscipit et ut, distinctio cum odit quibusdam repudiandae quis modi!</p>
            </div>

             {/* -----Center--------- */}
             <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Privacy & Policy</li>
                </ul>
                
                </div>

                 {/* -----Right--------- */}
            <div>
                 <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                 <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9874563210</li>
                    <li>sowmyasri@gmail.com</li>
                 </ul>
                
                </div>
        </div>
        <div>
             {/*-------CopyRight Text-------  */}
             <hr />
             <p className='py-5 text-sm text-center'>CopyRight 2024@Prescripto . ALL RIGHTS ARE RESERVED</p>
        </div>
    </div>
  )
}

export default Footer