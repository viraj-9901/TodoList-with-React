import React from 'react'
// import TaskForm from './TaskForm'
import Navbar from './Navbar'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import List from './List'
import Home from '../Pages/Home'
// import Input from '../components/Input'

function ForGround() {
  return (
    <div className='fixed w-full h-screen bg-transparent z-[10]'>
      <Navbar/>
      {/* <Register/> */}
      {/* <Login/> */}
        {/* <TaskForm/> */}
      {/* <List/> */}
      <Home/>
    </div>
  )
}

export default ForGround