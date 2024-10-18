import React from 'react'
import { assets } from '../assets/assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p > Contact <span className='text-gray-700 font-semibold'>Us</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-25 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt='' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>our office</p>
          <p>Address, 4012</p>
          <p>Tel: 8745217854</p>
          <p>Careers</p>
          <p>Lorem1 Lorem lorem</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>opportunities</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
