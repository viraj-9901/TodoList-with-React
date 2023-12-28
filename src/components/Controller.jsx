import React from 'react'
import { FaPen } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";

function Controller() {
  return (
    <div className='w-[16%] h-full bg-transparent py-7 px-7 border-r border-zinc-100'>
        <button className='relative w-44 h-16 rounded-lg bg-green-100 flex justify-center items-center hover:scale-[1.1] p-3'>
          <FaPen className='text-lg mr-3'/> 
          <p className='text-lg font-medium tracking-tight'>Add Task</p>
        </button>

        <div className='relative w-48 h-76 mt-5 py-3'>
            <div className='heading flex justify-start items-center'>
              <FaFilter className='text-2xl font-medium text-white'/> 
              <p className='text-xl font-medium text-white ml-2 tracking-wide'>Filters</p>
            </div>

            <div className='block mt-3 ml-8'>
              <p className='text-lg font-medium text-white tracking-wide'>Priority</p>
              
              <input type='checkbox' name='important' id='important' />
              <label for='important' className='ml-3 text-white'>important</label>
              <br/>
              <input type='checkbox' name='normal' id='normal'/>
              <label for='normal' className='ml-3 text-white'>normal</label>
              
            </div>

            <div className='block mt-4 ml-8'>
              <p className='text-lg font-medium text-white tracking-wide'>Status</p>
              
              <input type='checkbox' name='pending' id='pending' />
              <label for='pending' className='ml-3 text-white'>pending</label>
              <br/>
              <input type='checkbox' name='hold' id='hold'/>
              <label for='hold' className='ml-3 text-white'>hold</label>
              <br/>
              <input type='checkbox' name='completed' id='completed' />
              <label for='completed' className='ml-3 text-white'>completed</label>
              
            </div>
        </div>

        <div className='relative w-48 h-76 mt-5 py-3'>
            <div className='heading flex justify-start items-center'>
              <FaSort className='text-2xl font-medium text-white'/> 
              <p className='text-xl font-medium text-white ml-2 tracking-wide'>Sort</p>
            </div>

            <div className='block mt-3 ml-8'>
              <p className='text-lg font-medium text-white tracking-wide'>Due Date</p>
              
              <input type='checkbox' name='asc' id='asc' />
              <label for='asc' className='ml-3 text-white'>Ascending </label>
              <br/>
              <input type='checkbox' name='dsc' id='dsc'/>
              <label for='dsc' className='ml-3 text-white'>Descending </label>
              
            </div>
        </div>
    </div>
  )
}

export default Controller