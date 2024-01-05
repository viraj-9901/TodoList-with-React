 import React, {useState} from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import axios from 'axios'

function Card({handleTab, data, index, refreshData}) {

  const username = window.location.pathname.split('/')[2]
  const [sliderOpen, setSliderOpen] = useState(false)

  function sliderShow() {
    // data.close = !data.close
    setSliderOpen(!sliderOpen)
  }

  // function click(id){
  //   console.log(id,' button click');
  // }

  function click(e){
    e.preventDefault()
    handleTab(true,"Update",data)
    
  }

  function deleteTask(e){
    e.preventDefault()
    let taskId = data._id

    //delete task request
    axios.delete(`http://localhost:8080/user/${username}/${taskId}`,
      {
        withCredentials: true,  
      })
      .then(response => console.log(response))
      .catch((error) => console.log(error))

    //request: get all tasks after delete one task
    axios.get(`http://localhost:8080/user/${username}`,
    {
      withCredentials: true,  
    })
      .then(response => refreshData(response.data.message))
      .catch((error) => console.log(error))
 
  }

  return (
    <div className='relative flex-shrink-0 w-60 h-96 px-8 py-8 rounded-[35px] bg-zinc-600/30 text-white overflow-hidden mb-8'>
        <p className='text-sm font-semibold leading-tight'><span className='text-red'>Title:</span> {data.title}</p>
        <p className='text-sm font-semibold leading-tight mt-5 text-balance'>Description: {data.description}</p>
        <p className='text-sm font-semibold leading-tight mt-5'>due-Date: {(data.dueDate).split('T')[0]}</p>

        <div className='footer absolute bottom-0 w-full left-0'>
          
          <div className='relative flex justify-between items-center mb-1 pt-3 pb-2 px-8'>
            
            <button onClick={deleteTask} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
              <RiDeleteBin6Line size='0.9em' className='text-red-500'/>
            </button>

            <button onClick={click} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
              <RxUpdate size='0.9em' className='text-green-500'/>
            </button>

            <button onClick={sliderShow} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
              {sliderOpen? <RxCross1 size='0.9em' color='#fff'/> : <FaArrowDownLong size='0.8em' color='#fff'/>} 
            </button>

          </div>

          {sliderOpen? (
            <div className={`tag relative pb-2 px-8 block`}>
            <h3 className='text-sm font-semibold'>Priority: {data.priority}</h3>
            <h3 className='text-sm font-semibold'>Status: {data.status}</h3>
            <h3 className='text-sm font-semibold flex cursor-pointer'><FaRegFileAlt/>File.txt</h3>
            <h3 className='text-sm font-semibold flex cursor-pointer'><FaRegFileAlt/> Pending</h3>
            <h3 className='text-sm font-semibold flex cursor-pointer'><FaRegFileAlt/> Pending</h3>
            </div>
            ) : null
          }
        </div>
    </div>
  )
}

export default Card
















