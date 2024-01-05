import React from 'react'
import Navbar from './Navbar'
// import Login from '../Pages/Login'
// import Register from '../Pages/Register'
// import Home from '../Pages/Home'
import { Outlet } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'



function ForGround() {

  return (
    <div className='fixed w-full h-screen bg-transparent z-[10]'>
      <Toaster position="top-right"/>
      <Navbar/>
      <Outlet />
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <Home/> */}
     
    </div>
  )
}

export default ForGround