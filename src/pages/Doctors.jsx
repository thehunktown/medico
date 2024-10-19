import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, SetFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
const applyFilter = () => {
  if(speciality){
    SetFilterDoc(doctors.filter(doc => doc.speciality === speciality))
  }else{
    SetFilterDoc(doctors)
  }
}
useEffect(()=>{applyFilter()},[doctors,speciality]);

  return (
    <div>
      <p className='text-gray-600 '>Browse through the doctors specialits</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5' >
        <button className={`py-1 px-3 border rounded text-sm transition-all smLhidden ${showFilter ? 'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? `flex`:`hidden sm:flex` }`}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate(`/doctors/General physician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General Physician'? 'bg-indego-100 text-black': ''}`}>General Physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate(`/doctors/Gynecologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist'? 'bg-indego-100 text-black': ''}`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Darmatologist' ? navigate('/doctors') : navigate(`/doctors/Darmatologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Darmatologist'? 'bg-indego-100 text-black': ''}`}>Darmatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate(`/doctors/Pediatricians`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians'? 'bg-indego-100 text-black' : ''}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate(`/doctors/Neurologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist'? 'bg-indego-100 text-black': ''}`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate(`/doctors/Gastroenterologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist'? 'bg-indego-100 text-black':''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
                filterDoc.map((itm, idx)=> (
                  <div onClick={()=>navigate(`/appointment/${itm._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500' key={idx}>
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
              ))
            }
        </div>
      </div>
    </div>
  )
}

export default Doctors
