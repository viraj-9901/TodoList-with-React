import React from 'react';
import { FaUserLarge } from "react-icons/fa6";

function Navbar() {
  return (
    <div className='fixed w-full h-[6vh] top-[2%] bg-transparent-100 flex justify-between border-b border-zinc-100 border-opacity-10'>
        <h1 className='w-[88%] flex justify-start items-center ml-12 text-2xl font-semibold tracking-widest text-gray-50 cursor-pointer'>
            ToDo-List
        </h1>
        <div className='w-[12%] flex justify-between mr-16 items-center'>
            <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-blue-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2'>
                Register
            </button>
            <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2'>
                Login
            </button>

            <button className='relative rounded-full font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-purple-300 hover:bg-opacity-25 ] hover:bottom-[5%]'>
                <FaUserLarge className='w-5 h-4'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar