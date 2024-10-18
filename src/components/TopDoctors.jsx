import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
    return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
      <h1 className='text-3xl font-medium'> Top Doctors To Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid nihil in modi.</p>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
      {/* <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'> */}
        {/* slice method is for displayimg maximum doctors in window */}
        {doctors.slice(0,8).map((itm, idx)=> (
            <div  onClick={()=>{
              navigate(`/appointment/${itm._id}`); scrollTo(0,0);
               }
              } className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500' key={idx}>
                <img className='bg-blue-50' src={itm.image}/>
                <div className='p-4'>
                    <div className='flex item-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>
                        {itm.name}
                    </p>
                    <p className='text-grey-600 text-sm'>
                        {itm.speciality}
                    </p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>  
    </div>

  )
}

export default TopDoctors
