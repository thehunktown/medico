import React from 'react'
import { assets } from '../assets/assets/assets'
const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1Fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* --------- left section ------------  */}
                <div>
                    <img className='md-5 w-40' src={assets.logo} alt='' />
                    <p className='w-full gap-2 md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos enim numquam rerum corrupti natus. Ex quos consequuntur reprehenderit quasi?</p>
                </div>
                {/* --------- center section ------------  */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600 '>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Policy</li>
                    </ul>

                </div>
                {/* --------- right section ------------  */}
                <div>
                    <p className='text-xl font-medium mb-5'>Get In Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+963258841</li>
                        <li>dev@ashu.com</li>
                    </ul>
                </div>

            </div>
            <div>
                {/* copy right */}
                <p className='py-5 text-sm text-center'>all right reserved @devbyashu</p>
            </div>
        </div>
    )
}

export default Footer
