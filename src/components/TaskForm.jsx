import React, {useState} from 'react';
import { motion } from "framer-motion"
import DatePicker from "react-datepicker";
import axios from 'axios'
import toast from 'react-hot-toast';

import "react-datepicker/dist/react-datepicker.css";

function TaskForm({handleTab, reference, type, data, taskList}) {
    
    const [calOpen, setCalOpen] = useState(false)

    const [title, setTitle] = useState(data.title || "")
    const [description, setDescription] = useState(data.description || "")
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState(data.priority || "")
    const [status, setStatus] = useState(data.status || "")

    Date.prototype.dateFormat = function(dueDate){
        let month = dueDate.getMonth();
        let date = dueDate.getDate()
        if(dueDate.getMonth() + 1 < 10){
            month = '0'+ (dueDate.getMonth() + 1)
        }
        if(dueDate.getDate() < 10){
            date = '0'+ dueDate.getDate() 
        }
        return (dueDate.getFullYear() + '-' + month + '-' + date)
    }

    const username = window.location.pathname.split('/')[2]
    const formData = new FormData();
    
    //function: add/update task
    const taskSubmit = (e) => {
        e.preventDefault()

        formData.append('title',e.target.title.value);
        formData.append('description',e.target.description.value);
        formData.append('dueDate',e.target.dueDate.value);
        formData.append('priority',e.target.priority.value);
        formData.append('status',e.target.status.value);

        if(type[1] === 'POST'){
            axios.post(`http://localhost:8080/user/${username}`, formData, 
            {
                withCredentials: true,
                headers:{'Content-Type': 'multipart/form-data'},
            }
            )
            .then((response) => {
                console.log(response)
                toast.success("Task add successfully!")
            })
            .catch((error) => toast.error(error.response.data.error.message))
        }

        if(type[1] === 'PUT'){
            let taskId = data._id
            axios.put(`http://localhost:8080/user/${username}/${taskId}`, formData,
            {
                withCredentials: true,
                headers:{'Content-Type': 'multipart/form-data'},
            }
            )
            .then((response) => {
                console.log(response)
                toast.success("Task update successfully!")
            })
            .catch((error) => toast.error(error.response.data.error.message))
        }



        axios.get(`http://localhost:8080/user/${username}`,
        {
        withCredentials: true,  
        })
        .then(response => taskList(response.data.message))
        .catch((error) => console.log(error))

        // cancelClick()
    }   

    //function: cancel task form
    function cancelClick(){
        handleTab(false)
    }

    //function: control of calender 
    function HandleCalender(){
        setCalOpen(!calOpen)
    }
    
  return (
    // <div className='relative flex justify-between top-[8vh] w-full h-full z-[50]'>

        <motion.div drag dragConstraints={reference} className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
        <form onSubmit={taskSubmit} className="signup-form w-[32rem] rounded-2xl text-[#1A2421] backdrop-blur-lg 
                        [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] 
                        [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
        
            <h1 className="mb-4 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">TASK DETAILS</h1>
            

            <label htmlFor="title" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" 
                   type="text" name="title" id="title" placeholder="Title" value={title || data.title} 
                   onChange={(e) => setTitle(e.target.value)} 
            />
            </label>

            <label htmlFor="description" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <textarea className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" 
                      type="text" name="description" id="description" placeholder="Description" value={description || data.description} 
                      onChange={(e) => setDescription(e.target.value)} 
            />
            </label>
  
            <label  htmlFor="dueDate" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <p onClick={HandleCalender}  className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" name="dueDate" >
            dueDate: {
                <DatePicker showIcon selected={dueDate} onSelect={(date) => setDueDate(date)} className='bg-transparent border-0 focus:border-0' value={dueDate.dateFormat(dueDate) || dueDate} id='dueDate'/>
            }    
            </p>
            </label>
           

            <label htmlFor="priority" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333] 
                                            ">
                <select className='form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                                [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                                [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] '
                        id='priority' value={priority || data.priority} onChange={(e) => setPriority(e.target.value)}
                >
                    <option >Priority</option>
                    <option value='important'>important</option>
                    <option value='normal'>normal</option>
                </select>
            </label>

            <label htmlFor="status" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333] 
                                            ">
                <select className='form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                                [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                                [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] '
                        id='status'  value={status || data.status} onChange={(e) => setStatus(e.target.value)}           
                >
                    <option >Status</option>
                    <option value='pending'>pending</option>
                    <option value='hold'>hold</option>
                    <option value='completed'>completed</option>
                </select>
            </label>
        
            <button type='submit' className="form-input w-full rounded-lg font-bold text-white focus:outline-none
            [ p-3 md:p-4 lg:p-4 ] 
            [ transition-colors duration-500 ] 
            [ bg-zinc-900 hover:bg-zinc-800 ]">
            {type[0]} Task
            </button>


            <button onClick={cancelClick} className="form-input w-full rounded-lg font-bold text-white focus:outline-none mt-3
            [ p-3 md:p-4 lg:p-4 ] 
            [ transition-colors duration-500 ] 
            [ bg-red-800 hover:bg-red-700 ]">
            CANCEL
            </button>
        
        </form>
        </motion.div> 
    // </div>
  )
}

export default TaskForm