import React, {useState} from 'react';
import { motion } from "framer-motion"
import DatePicker from "react-datepicker";
import axios from 'axios'
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm({handleTab, reference, type, data, taskList}) {
    let tempName = [];
    console.log('data-11-TF: ',data);

    const [calOpen, setCalOpen] = useState(false)

    const [title, setTitle] = useState(data.title || "")
    const [description, setDescription] = useState(data.description || "")
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState(data.priority || "")
    const [status, setStatus] = useState(data.status || "")
    const [attachment, setAttachment] = useState(data.files || [] )
    const [taskFiles, setTaskFiles] = useState(data.files || [])

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
    const taskSubmit = async (e) => {
        try {
        e.preventDefault()
        let attachments = e.target.attachment.files

        formData.append('title',e.target.title.value);
        formData.append('description',e.target.description.value);
        formData.append('dueDate',e.target.dueDate.value);
        formData.append('priority',e.target.priority.value);
        formData.append('status',e.target.status.value);

        // for(let i = 0; i < uploadFile.length; i ++){
        //     formData.append('files',e.target.attachment.files[i]);
        // }

        for(let i = 0; i < attachments.length; i ++){
            formData.append('files',attachments[i]);
        }

        
        if(type[1] === 'POST'){
            await axios.post(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}`, formData, 
            {
                withCredentials: true,
                headers:{'Content-Type': 'multipart/form-data'},
            }
            )
            .then((response) => {
                // console.log(response)
                toast.success("Task add successfully!")
            })
            .catch((error) => toast.error(error.response.data.error.message))
        }

        if(type[1] === 'PUT'){
            let taskId = data._id
            // console.log(formData);
            await axios.put(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/update/${taskId}`, formData,
            {
                withCredentials: true,
                headers:{'Content-Type': 'multipart/form-data'},
            }
            )
            .then((response) => {
                // console.log(response)
                toast.success("Task update successfully!")
            })
            .catch((error) => toast.error(error.response.data.error.message))
        }

        await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}`,
        {
            withCredentials: true,  
        })
        .then(response => taskList(response.data.message))
        .catch((error) => console.log(error))

        // cancelClick()
    } catch (error) {
        toast.error(error) 
    }
}

    //function: cancel task form
    function cancelClick(){
        handleTab(false)
    }

    //function: control of calender 
    function HandleCalender(){
        setCalOpen(!calOpen)
    }

    //function: delete file
    async function HandleDeleteFile(e){
        try {
            e.preventDefault()
            let taskId = data._id
            let fileName = e.target.id

            await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/${taskId}/delete/${fileName}`,{
                withCredentials: true,  
            })
            .then((response) => {
                    toast.success("file delete successfully")
                    let fileList = [...taskFiles];
                    fileList.splice(fileName,1);
                    setTaskFiles(fileList)

                })
            .catch((error) => toast.error("Something went wrong"))

            // await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}`,
            // {
            //     withCredentials: true,  
            // })
            // .then(response => taskList(response.data.message))
            // .catch((error) => console.log(error))
        } catch (error) {
            
        }
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
                <DatePicker 
                    showIcon 
                    selected={dueDate} 
                    onSelect={(date) => setDueDate(date)} 
                    minDate={new Date()}
                    className='bg-transparent border-0 focus:border-0' value={dueDate.dateFormat(dueDate) || dueDate} id='dueDate'/>
            }    
            </p>
            </label>
           
            <div className='relative flex flex-row justify-around'>
                <label htmlFor="priority" className="form-label w-[45%] relative block mb-4 text-black/50 focus-within:text-[#333]  ">                  
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

                <label htmlFor="status" className="form-label w-[45%] relative block mb-4 text-black/50 focus-within:text-[#333] "> 
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
            </div>

            {
                (taskFiles.length > 0)? (
                    taskFiles.map((file) => (
                        <h6 className='w-fit h-fit bg-black/20 rounded-lg font-bold text-[#333] p-1 pl-5 mb-1 flex'>{file.userFileName || file} 
                            <RxCross1 onClick={HandleDeleteFile} className='relative top-1 ml-10 font-bold text-lg hover:text-white cursor-pointer' id={file.userFileName || file}/>
                        </h6>
                    ))
                ) : null
            }
           


            {/* {
                (attachment.length < 3)? (
                    attachment.map((file) => (
                        <p className='w-full h-fit bg-black/20 rounded-lg font-bold text-[#333] p-1 pl-5 mb-1 flex'>{file.userFileName || file.name} <RxCross1 className='relative top-1 ml-10 font-bold text-lg hover:text-white'/> </p>
                    ))
                ) : null
            } */}

            { (taskFiles.length < 4)?
                ( 
                <>
                <label htmlFor="attachment" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            
                <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                                [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                                [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] 
                                file:bg-transparent file:border-0 file:py-2 file:hidden file:" 
                                type="file" name="attachment" id="attachment" placeholder="attachment(s)" multiple
                                onChange={(value) => {
                                    setAttachment(value)
                                    // setTaskFiles([...taskFiles, value.target.files])
                                    
                                    let files = value.target.files
                                    for(let i = 0; i < files.length; i++){
                                        tempName.push(files[i].name)
                                    }
                                    setTaskFiles([...taskFiles, ...tempName])
                                    
                                }}  
                />
        
                </label>
                </>
                ) : null
            } 

           
            <label htmlFor="assignUser" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" 
                   type="text" name="assignUser" id="assignUser" placeholder="Select user to assign task"  
                    
            />
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