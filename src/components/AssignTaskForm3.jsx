import React, { useState } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import AutoCompleteComponent from './AutoCompleteComponent';
import { RxCross1 } from "react-icons/rx";
import toast from 'react-hot-toast';

function AssignTaskForm3({handleAssignForm, data, reference}) {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedUsersId, setSelectedUsersId] = useState([])
  const username = window.location.pathname.split('/')[2]
  let taskId = data._id

  const getSelectedUsers = (value) => {
    if(selectedUsers.length > 2){
      toast.error("Only 3 user allowed")
      return
    }
    
    if(selectedUsersId.includes(value._id)){
      toast.error("User already selected")
      return
    }

    setSelectedUsersId([(value._id), ...selectedUsersId])
    setSelectedUsers([ value, ...selectedUsers])
  }

  const assignTask = async(e) => {
    e.preventDefault();
   
    await axios.put(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/${taskId}/assignTo`,
          { assignTo: selectedUsers },
          {
            withCredentials: true,
            headers:{'Content-Type': 'application/json'},
          })
          .then((response) => {
            // setSelectedUsers(response.data.data)
            toast.success('user assign')
            // setSelectedUsers(response.data.data.assignTo)
          })
          .catch((error) => console.log(error))
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    let removeUserId = e.target.id

    await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/${taskId}/removeAssign/${removeUserId}`,
    {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response)
      toast.success('Assign list updated')
      // setSelectedUsers(response.data.data.assignTo)
    })
    .catch((error) => console.log(error))
  }

  const cancelClick = (e) => {
    e.preventDefault();
    handleAssignForm(false)
  }

  return (
    <motion.div drag dragConstraints={reference} className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
      <div className='signup-form w-[32rem] min-h-screen rounded-2xl text-white backdrop-blur-lg 
                      [ p-8 md:p-10 lg:p-10 ] 
                      [ bg-gradient-to-b from-purple-400/20 to-purple-700/40 ] 
                      [ border-[2px] border-solid border-white border-opacity-10 ] 
                      [ shadow-purple-300/40 shadow-md ]'>

          <h1 className="mb-3 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">Assign Task</h1>
          <p className="mb-4 [ text-sm text-white/90 text-opacity-50 ]">Select a user from whole app.</p>
          <p className="mb-4 [ text-sm text-white/90 text-opacity-50 ]">Note: You assign maximum<span className='font-extrabold text-lg'> 3 users</span> in single task.</p>

          {
            selectedUsers.length < 3 && (
              <AutoCompleteComponent getSelectedUsers={getSelectedUsers}/>
              
            )
          }
  
          {
          selectedUsers.length > 0  && (
            <>
            <ul className="form-label relative block mt-4 mb-3 text-white/90 focus-within:text-white rounded-lg bg-purplr-200
                           [ border-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
            >
              <p className="mb-1 uppercase font-bold [ text-md md:text-md lg:text-md ] mt-2 ml-4">Assign Task To:</p>
              {selectedUsers.map((user) => (
                <li key={user._id}
                    className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-white/50
                               flex justify-between  
                               [ transition-colors duration-200 ] 
                               [ py-2 pr-2 md:py-3 md:pr-3 lg:py-4 lg:pr-4 pl-5 ] 
                               [ bg-transparent hover:bg-purple-500 ] 
                               [ text-white hover:text-white ] "
                    id = {user._id}
                              //  [  border-b-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
                    
                    
                >{user.username}
                  <RxCross1 onClick={handleDelete} id={user._id} />
                </li>
              ))}
            </ul>
            </>
          )
        }

        <button onClick={assignTask } type='submit' className="form-input w-full rounded-lg font-bold text-white focus:outline-none
            [ p-3 md:p-4 lg:p-4 ]
            [ transition-colors duration-500 ] 
            [ bg-purple-700 hover:bg-purple-800 ] mt-5 mb-5 hover:scale-[1.025] bottom-0">
            Assign Task
        </button> 

        <button onClick={cancelClick} className="form-input w-full rounded-lg font-bold focus:outline-none
            [ p-3 md:p-4 lg:p-4 ]
            [ transition-colors duration-500 ] 
            [ text-white hover:text-black ]
            [ bg-purple-700 hover:bg-zinc-200 hover:scale-[1.025] ]">
            Cancel
        </button>
        
      </div>
    </motion.div>
    
  )
}

export default AssignTaskForm3