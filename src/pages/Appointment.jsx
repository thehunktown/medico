import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets'

const Appointment = () => {
  const {docId} = useParams()
  const {doctors, currencySymbol} = useContext(AppContext)
  const [docInfo, setDocInfo ] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState('');

 const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    if (!docInfo) {
      console.error(`Doctor with id ${docId} not found`)  
    }
    console.log("Fetched docInfo:", docInfo) 
  }

const getAvailableSlots = async () =>{
  setDocSlots([]);
  // getting current date
  let today = new Date();
  for(let i = 0; i < 7; i++){
    // getting dates with index
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    // end time of of the date with idx
    let endTime = new Date();
    endTime.setDate(today.getDate() + 1)
    endTime.setHours(21,0,0,0);

    // setting hours 
    if(today.getDate() === currentDate.getDate()){
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    }else {
      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }
    let timeSlots = [];
    while(currentDate < endTime){
      let formattedTime  = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

      // add slot to array ..
      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime
      });
      // increment the time by 30 min 
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }
    setDocSlots(prev => ([...prev, timeSlots]));
  }
}

useEffect(() => {
  fetchDocInfo()
}, [doctors, docId])

// whenever docinfo will be change this use effact will change baseically it have a dependecy array after 
useEffect(
  () => {
     getAvailableSlots();
  }
,[docInfo]);


  if (!docInfo) {
    return <div>Loading...</div>
  }

  useEffect(() => {
   console.log('==== doctor slots =====');
    console.log(docSlots);
  },[docSlots]);

// in this return we will check if doctor info is available then only return..
  return docInfo && (
    <div>
      {/* doctor details */}
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''/>
        </div>
        <div className='flex-q border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* doc info: name, degree, experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
            <img className='w-5 ' src={assets.verified_icon} alt='' /> </p>
          <div className='flex item-center gap-2 text-sm mt-1 text-gray-600 '>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
          </div>
          {/* doctor about */}
          <div>
            <p className='flex item-center gap-1 text-sm font-medium text-gray-900 mt-3'> About <img src={assets.info_icon} alt='' /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4 '>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Appointment
