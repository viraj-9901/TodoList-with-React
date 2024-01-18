import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios'


function AssignTaskForm({handleAssignForm, data, reference}) {

    const [text, setText] = useState('')
    const [users, setUsers] = useState([])
    const username = window.location.pathname.split('/')[2]
    let names = []
    let listName = []

    // useEffect(() => {
    //     getAllUsersFromDatabase()
    // },[])

    useEffect(() => {
          (async () => { 
            let response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/getAllUsers`,
              {
                withCredentials: true 
              })
            let data = response.data.data;
            data.map((user) => names.push(user.username))
            setUsers(names)
          })()
        
      },[])

    // const getAllUsersFromDatabase = async () => {
    //     try {
    //          axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/assignTask`,
    //         {
    //             withCredentials: true,
    //             // headers:{'Content-Type': 'multipart/form-data'},
    //         }
    //         )
    //         .then((response) => {
    //             let data = response.data.message
    //             data.map((user) => names.push(user.username))

    //             // setUsers(response.data.message)
    //             setUsers(names)
                
    //         })
    //         .catch((error) => console.log(error))

    //     } catch (error) {
    //         console.log("Something went wrong while fetch all users from database: ", error);
    //     }
    // }


    const findUsers = async (e) => {
        console.log('text field change');
        setText(e.target.value)

    }

    function cancelClick(e){
        e.preventDefault();
        handleAssignForm(false)
    }
  return (
    <motion.div drag dragConstraints={reference} className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
    <div className='signup-form w-[32rem] rounded-2xl text-white backdrop-blur-lg 
    [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-purple-400/20 to-purple-700/40 ] 
    [ border-[2px] border-solid border-white border-opacity-10 ] [ shadow-purple-300/40 shadow-md ]'>

        <h1 className="mb-4 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">Assign Task</h1>
        <p className="mb-4 [ text-sm text-white/90 text-opacity-50 ]">Select a user from whole app.</p>
        <p className="mb-4 [ text-sm text-white/90 text-opacity-50 ]">Note: You assign maximum 3 user in single task.</p>

        <label htmlFor="assignUser" className="form-label relative block mb-4 text-white/90 focus-within:text-white">
            <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-white/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-transparent focus:bg-transparent ] [ text-white focus:text-white ] [ border-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]" 
                   type="text" 
                   name="assignUser" id="assignUser" 
                   placeholder="Select user to assign task" 
                   value={text}
                   onChange={findUsers}     
            />
        </label>

        {
            users.map((user) => (
              <li >{user}</li>
            ))
        }

        <button type='submit' className="form-input w-full rounded-lg font-bold text-white focus:outline-none
            [ p-3 md:p-4 lg:p-4 ] 
            [ transition-colors duration-500 ] 
            [ bg-purple-700 hover:bg-purple-800 ] mb-5 hover:scale-[1.025]">
            Assign Task
        </button>

        <button onClick={cancelClick} className="form-input w-full rounded-lg font-bold text-white focus:outline-none
            [ p-3 md:p-4 lg:p-4 ] 
            [ transition-colors duration-500 ] 
            [ bg-purple-700 hover:bg-purple-800] hover:scale-[1.025]">
            Cancel
        </button>
    </div>  
    </motion.div>  
  )
}

export default AssignTaskForm