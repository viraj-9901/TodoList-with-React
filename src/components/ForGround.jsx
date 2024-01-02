import React from 'react'
import Navbar from './Navbar'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Home from '../Pages/Home'
import { Outlet } from 'react-router-dom'



function ForGround() {

  return (
    <div className='fixed w-full h-screen bg-transparent z-[10]'>
      <Navbar/>
      <Outlet />
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <Home/> */}
     
    </div>
  )
}

export default ForGround