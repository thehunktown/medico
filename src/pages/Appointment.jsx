import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIdx, setSlotIdx] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
    if (!docInfo) {
      console.error(`Doctor with id ${docId} not found`)
    }
    console.log('Fetched docInfo:', docInfo)
  }

  const getAvailableSlots = async () => {
    let newDocSlots = [] // Temporary array to collect all slots

    // getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // getting dates with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // end time of the date with idx
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })

        // increment the time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      // Push the generated slots for the day to the newDocSlots array
      newDocSlots.push(timeSlots)
    }

    // After the loop, update the state with the entire slots array
    setDocSlots(newDocSlots)
  }

  // Fetch doctor info when doctors or docId change
  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  // Fetch available slots when docInfo is set
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  // useEffect to monitor docSlots and log changes
  useEffect(() => {
    if (docSlots.length > 0) {
      console.log('==== doctor slots =====')
      console.log(docSlots)
    }
  }, [docSlots])

  if (!docInfo) {
    return <div>Loading...</div>
  }

  // Render the doctor info and slots
  return (
    docInfo && (
      <div>
        {/* doctor details */}
        <div className='flex flex-col sm:flex-row gap-4 '>
          <div>
            <img
              className='bg-primary w-full sm:max-w-72 rounded-lg'
              src={docInfo.image}
              alt=''
            />
          </div>
          <div className='flex-q border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* doc info: name, degree, experience */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}
              <img className='w-5 ' src={assets.verified_icon} alt='' />
            </p>
            <div className='flex item-center gap-2 text-sm mt-1 text-gray-600 '>
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className='py-0.5 px-2 border text-xs rounded-full '>
                {docInfo.experience}
              </button>
            </div>
            {/* doctor about */}
            <div>
              <p className='flex item-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                About <img src={assets.info_icon} alt='' />
              </p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
                {docInfo.about}
              </p>
            </div>
            <p className='text-gray-500 font-medium mt-4 '>
              Appointment Fee:{' '}
              <span className='text-gray-600'>
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ------ Booking Slots ------  */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              docSlots.length && docSlots.map((itm, idx) => (
                <div onClick={() => setSlotIdx(idx)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === idx ? "bg-primary text-white" : 'border border-gray-200'}`} key={idx}>
                  <p>{itm[0] && daysOfWeek[itm[0].datetime.getDay()]}</p>
                  <p>{itm[0] && itm[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
              {docSlots.length  && docSlots[slotIdx].map((itm, idx)=>(
                <p onClick={()=>setSlotTime(itm.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${itm.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300 '}`} key={idx}>
                  {itm.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book A Appointment</button>
        </div>

              {/* Listing Related Doctors, passing docId prop */}
              < RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      </div>
    )
  )
}

export default Appointment
