import React, { useState } from 'react'
import { FaPen } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import axios from 'axios'
import toast from 'react-hot-toast';

function Controller({handleTab, taskList}) {
  
  const [formData, setFormData] = useState({
    priority:"",
    status:"",
    sort:""
  })
  
  const username = window.location.pathname.split('/')[2]

  function addTask(){
    handleTab(
      true,
      ['Add',"POST"],
      {}
    )
  }
  
  async function applyQuery(e){
    e.preventDefault();
    const response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}?priority=${formData.priority}&status=${formData.status}&sort=${formData.sort}`,
      {
        withCredentials: true,  
      })
    toast.success("Task filtered!")
    let tasks = response.data.message                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    taskList(tasks)
  }

  async function resetFilter(e){
    e.preventDefault();
    
    setFormData({
      priority:"",
      status:"",
      sort:""
    })

    let response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}`,
      {
        withCredentials: true,  
      })
    
    toast.success("Filter reset")
    let tasks = response.data.message
    // console.log("this tasks from controller :", tasks);
    taskList(tasks)
  }

  function handleChange(name,value){
    setFormData({...formData, [name]:value})
  }
  
  
  return (
    <>
    <div className='w-[16%] h-full bg-transparent py-7 px-7 border-r border-zinc-100'>
        <button onClick={addTask} className='relative w-44 h-16 rounded-lg bg-green-100 flex justify-center items-center hover:scale-[1.03] p-3'>
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
               
                <input type='radio' name='priority' id='important' onChange={() => handleChange('priority','important')} defaultChecked={true}/>
                <label htmlFor='important' className='ml-3 text-white'>important</label>
                <br/>
                <input type='radio' name='priority' id='normal'  onChange={() => handleChange('priority','normal')}/>
                <label htmlFor='normal' className='ml-3 text-white'>normal</label>
                
              </div>

              <div className='block mt-4 ml-8'>
                <p className='text-lg font-medium text-white tracking-wide'>Status</p>
                
                <input type='radio' name='status' id='pending'  onChange={() => handleChange('status','pending')} defaultChecked={true}/>
                <label htmlFor='pending' className='ml-3 text-white'>pending</label>
                <br/>
                <input type='radio' name='status' id='hold'  onChange={() => handleChange('status','hold')}/>
                <label htmlFor='hold' className='ml-3 text-white'>hold</label>
                <br/>
                <input type='radio' name='status' id='completed'  onChange={() => handleChange('status','completed')}/>
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
                
                <input type="radio" name='sort' id='asc'  onChange={() => handleChange('sort',1)}/>
                <label htmlFor='asc' className='ml-3 text-white'>Ascending </label>
                <br/>
                <input type='radio' name='sort' id='dsc'  onChange={() => handleChange('sort',-1)}/>
                <label htmlFor='dsc' className='ml-3 text-white'>Descending </label>
                
              </div>
          </div>

          <button onClick={applyQuery} className='relative w-44 h-8 rounded-lg bg-green-100 flex justify-center items-center p-3 mt-5'>
            <p className='text-lg font-medium tracking-tight'>Apply</p>
          </button>

          <button onClick={resetFilter} className='relative w-44 h-8 rounded-lg bg-green-100 flex justify-center items-center p-3 mt-5'>
            <p className='text-lg font-medium tracking-tight'>Reset</p>
          </button>

          {/* <button onClick={resetFilter} className='relative w-44 h-8 rounded-lg bg-green-100 flex justify-center items-center p-3 mt-5'>
            <p className='text-lg font-medium tracking-tight'>Get All Tasks</p>
          </button> */}

        </form>
    </div>
    </>
  )
}

export default Controller