 import React, {useState} from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineAssignmentInd } from "react-icons/md";
import axios from 'axios';
import { Tooltip, Position } from 'evergreen-ui'


function Card({handleTab, data, refreshData, handleAssignForm}) {

  const username = window.location.pathname.split('/')[2]
  const [sliderOpen, setSliderOpen] = useState(false)

  // const formData = new FormData();

  function sliderShow() {
    setSliderOpen(!sliderOpen)
  }

  function updateTask(e){
    e.preventDefault()
    handleTab(
      true,
      ['Update',"PUT"],
      data
    ) 
    handleAssignForm(false)
  }

  function assignTask(e){
    e.preventDefault()
    handleAssignForm(
      true,
      data
    )
    handleTab(false)
  }

  async function deleteTask(e){
    e.preventDefault()
    let taskId = data._id

    //delete task request
    await axios.delete(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/delete/${taskId}`,
      {
        withCredentials: true,  
      })
      .then(response => console.log(response))
      .catch((error) => console.log(error))

    //request: get all tasks after delete one task
    await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}`,
    {
      withCredentials: true,  
    })
      .then(response => refreshData(response.data.message))
      .catch((error) => console.log(error))
 
  }

  return (
    <div className='relative flex-shrink-0 w-60 h-96 px-8 py-8 rounded-[35px] bg-zinc-600/30 text-white overflow-hidden mb-8' key={data._id}>
        <p className='text-sm font-semibold leading-tight'><span className='text-red'>Title:</span> {data.title}</p>
        <p className='text-sm font-semibold leading-tight mt-5 text-balance'>Description: {data.description}</p>
        <p className='text-sm font-semibold leading-tight mt-5'>due-Date: {(data.dueDate).split('T')[0]}</p>

        <div className='footer absolute bottom-0 w-full left-0'>
          
          <div className='relative flex justify-between items-center mb-1 pt-3 pb-2 px-8'>
            
            <Tooltip content="Delete task" position={Position.TOP} >
              <button onClick={deleteTask} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
                <RiDeleteBin6Line size='0.9em' className='text-red-500'/>
              </button>
            </Tooltip>

            <Tooltip content="Update task" position={Position.TOP} >
              <button onClick={updateTask} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
                <RxUpdate size='0.9em' className='text-green-500'/>
              </button>
            </Tooltip>

            <Tooltip content="Assign task" position={Position.TOP} >
              <button onClick={assignTask} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
                <MdOutlineAssignmentInd size='0.9em' className='text-sky-500'/>
              </button>
            </Tooltip>

            <Tooltip content="More info" position={Position.TOP} >
              <button onClick={sliderShow} className='w-7 h-7 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer'>
                {sliderOpen? <RxCross1 size='0.9em' color='#fff'/> : <FaArrowDownLong size='0.8em' color='#fff'/>} 
              </button>
            </Tooltip>

          </div>

          {sliderOpen? (
            <div className={`tag relative pb-2 px-8 block`}>
            <h3 className='text-sm font-semibold'>Priority: {data.priority}</h3>
            <h3 className='text-sm font-semibold'>Status: {data.status}</h3>
           {
             data.files.map(file => (
              <a href={`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/${data._id}/download/${file.userFileName}`} download={file.userFileName}>
                <h3 className='text-sm font-semibold flex cursor-pointer mt-1' data-value={file.userFileName}><FaRegFileAlt/>{file.userFileName}</h3>
              </a>
             ))
           }
            </div>
            ) : null
          }
        </div>
    </div>
  )
}

export default Card
















