import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-1 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span> 
        </p>
        </div>  
        <div className='my-10 flex flex-col gap-12 md:flex-row'>
          <img className='w-full md:max-w-[360px] ' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae adipisci blanditiis, in optio rerum quibusdam nulla tenetur aliquam voluptate repellendus earum harum similique natus! Porro, soluta labore. Aperiam unde perspiciatis voluptates ducimus ipsam quaerat eveniet alias error explicabo! Cupiditate in aliquid assumenda vero repellat eum numquam minima! Temporibus facere ex quod id est beatae laborum!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quos iusto itaque inventore optio, reiciendis soluta labore quidem atque eligendi vitae quo fuga autem explicabo neque similique blanditiis nesciunt harum dolorem rerum dolor a molestias voluptate tempore. Beatae, qui accusantium!</p>
            <b className='tet-gray-800'>Our Vision</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officiis atque nam quia modi, nostrum doloremque sunt quaerat, quis odio consequuntur laboriosam et voluptatibus maiores praesentium ab voluptas ipsam placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quaerat et accusantium facilis, iusto non.</p>
          </div>
        </div>
        <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700font-semibold'>CHOOSE US</span></p>

        </div>
        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 sm:py-16 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray =-600 cursor-pointer'>
            <b>EFFICIENCY:</b>
            <p>Streamlined appointment scheduling that fits into your busy Lifestyle</p>

          </div>
          <div className='border px-10 sm:py-16 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray =-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare proffessionals in your area</p>

          </div>
          <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and remainder to help you stay on top of your health</p>

          </div>
        </div>
    </div>
  )
}

export default About