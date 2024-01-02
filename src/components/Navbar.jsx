import React, {useState} from 'react';
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios'

function Navbar() {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)

    function handleMenu(){
        setMenu(!menu)
    }

    function logoutUser(){
        axios.post('http://localhost:8080/user/logout')
            .then(navigate(`/`))
            .catch((error) => {console.log(error);})
        
         handleMenu()
    }

  return (
    <>
    <div className='fixed w-full h-[6vh] top-[2%] bg-transparent-100 flex justify-between border-b border-zinc-100 border-opacity-10'>
        <h1 className='w-[88%] flex justify-start items-center ml-12 text-2xl font-semibold tracking-widest text-gray-50 cursor-pointer'>
            <Link to='/'>
                Todo-List
            </Link> 
        </h1>
        <div className='w-[12%] flex justify-between mr-16 items-center'>
            <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-blue-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2'>
                <Link to='/user/register'>
                    Register
                </Link> 
            </button>
            <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2'>
            <Link to='/user/login'>
                    Login
                </Link> 
            </button>

            <button onClick={handleMenu} className='relative rounded-full font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-purple-300 hover:bg-opacity-25 ] hover:bottom-[5%]'>
                <FaUserLarge className='w-5 h-4'/>
            </button>
        </div>
    </div>

    { menu ? (
    <div className='fixed w-60 h-screen top-[8vh] flex flex-col bg-zinc-800/90 bg-opacity-5 border-l border-zinc-700 right-0 pt-5 z-[20]  '>
        <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-blue-300 hover:bg-opacity-25 ] mb-3'>
            User Info
        </button>
        <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] mb-3'>
            Update User
        </button>
        
        <button onClick={logoutUser} className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-violet-300 hover:bg-opacity-25 ] mb-3'>
                Logout
        </button>
    </div> ) : null
    }
    </>
  )
}

export default Navbar