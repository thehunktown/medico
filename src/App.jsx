import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Doctors from './pages/Doctors'
import Login from './pages/login'
import  Contact  from './pages/Contact'
import  MyProfile  from './pages/MyProfile'
import  MyAppoitment  from './pages/MyAppoitment'
import  Appointment  from './pages/Appointment'
import Footer from './components/Footer'
import About from './pages/About'
// importing components
import  Navbar  from './components/navbar';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      < Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/doctors' element={< Doctors />} />
      <Route path='/doctors/:speciality' element={< Doctors />} />
      <Route path='/log-in' element={< Login />} />
      <Route path='/contact' element={< Contact />} />
      <Route path='/my-profile' element={< MyProfile/>} />
      <Route path='/my-appointment/' element={< MyAppoitment/>} />
      <Route path='/appointment/:docId' element={< Appointment/>} />
      <Route path='/about' element={< About />} />
      </Routes>
      < Footer />
    </div>
  )
}

export default App
