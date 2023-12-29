import React from 'react'
import { FaPen } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";


function Controller({handleTab}) {
  
  function click(){
    handleTab(true)
  }
  function click2(e){
    // e.preventDefault()
  }

  return (
    <>
    <div className='w-[16%] h-full bg-transparent py-7 px-7 border-r border-zinc-100'>
        <button onClick={click} className='relative w-44 h-16 rounded-lg bg-green-100 flex justify-center items-center hover:scale-[1.1] p-3'>
          <FaPen className='text-lg mr-3'/> 
          <p className='text-lg font-medium tracking-tight'>Add Task</p>
        </button>

        <form>
          <div className='relative w-48 h-76 mt-5 py-3'>
              <div className='heading flex justify-start items-center'>
                <FaFilter className='text-2xl font-medium text-white'/> 
                <p className='text-xl font-medium text-white ml-2 tracking-wide'>Filters</p>
              </div>

              <div className='block mt-3 ml-8'>
                <p className='text-lg font-medium text-white tracking-wide'>Priority</p>
                
                <input type='radio' name='important' id='important' value='important' />
                <label htmlFor='important' className='ml-3 text-white'>important</label>
                <br/>
                <input type='radio' name='normal' id='normal' value='normal'/>
                <label htmlFor='normal' className='ml-3 text-white'>normal</label>
                
              </div>

              <div className='block mt-4 ml-8'>
                <p className='text-lg font-medium text-white tracking-wide'>Status</p>
                
                <input type='radio' name='pending' id='pending' />
                <label htmlFor='pending' className='ml-3 text-white'>pending</label>
                <br/>
                <input type='radio' name='hold' id='hold'/>
                <label htmlFor='hold' className='ml-3 text-white'>hold</label>
                <br/>
                <input type='radio' name='completed' id='completed' />
                <label htmlFor='completed' className='ml-3 text-white'>completed</label>
                
              </div>
          </div>

          <div className='relative w-48 h-76 mt-5 py-3'>
              <div className='heading flex justify-start items-center'>
                <FaSort className='text-2xl font-medium text-white'/> 
                <p className='text-xl font-medium text-white ml-2 tracking-wide'>Sort</p>
              </div>

              <div className='block mt-3 ml-8'>
                <p className='text-lg font-medium text-white tracking-wide'>Due Date</p>
                
                <input type="radio" name='asc' id='asc' />
                <label htmlFor='asc' className='ml-3 text-white'>Ascending </label>
                <br/>
                <input type='radio' name='dsc' id='dsc'/>
                <label htmlFor='dsc' className='ml-3 text-white'>Descending </label>
                
              </div>
          </div>

          <button onClick={click2} className='relative w-44 h-8 rounded-lg bg-green-100 flex justify-center items-center p-3 mt-5'>
            
            <p className='text-lg font-medium tracking-tight'>Apply</p>
          </button>

          <button className='relative w-44 h-8 rounded-lg bg-green-100 flex justify-center items-center p-3 mt-5'>
            {/* <FaPen className='text-lg mr-3'/>  */}
            <p className='text-lg font-medium tracking-tight'>Reset</p>
          </button>

        </form>
    </div>
    </>
  )
}

export default Controller