import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios'
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";
import { AutoComplete } from 'rsuite';

function AssignTaskForm({handleAssignForm, data, reference}) {

    const [text, setText] = useState('')
    const [users, setUsers] = useState([])
    // const [userList, setUserList] = useState([])
    const [selectedUsers, setSelectedUsers] = useState(data.assignTo || [])
    // const [selectedUsersId, setSelectedUsersId] = useState(data.assignTo || [])

    const username = window.location.pathname.split('/')[2]
    let taskId = data._id
    let names = []
    let listnames = []

    // useEffect(() => {
    //       (async () => { 
    //         let response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/getAllUsers`,
    //           {
    //             withCredentials: true 
    //           })
    //         let data = response.data.data;
    //         setUsers(data)
    //       })()
    //   },[window.location.reload])


    const findUsers = async (e) => {
        setText(e.target.value)
        let inputText = e.target.value
        // if(e.target.value === ""){
        //   return setUserList("")
        // }

        let response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/getAllUsers/${inputText}`,{
                      withCredentials: true 
                    })
        setUsers(response.data.data)
      

        // names = users.filter((user) => ( (user.username).toLowerCase() ).includes( (e.target.value).toLowerCase() )).slice(0,3);
        // names.map((name) => listnames.push(name))
        // setUserList(listnames)
    }


    const selectedUsersList = (e) => {
      let name = e.target.dataset.value; 
      let key = e.target.dataset.key;
      let users = selectedUsers
      console.log(users);
      
      if(users.length === 3){
        toast.error("Only 3 user allowed");
        return
      }

      if(users.includes(name)){
        toast.error("User alredy selected");
        return
      }

      let user = {
        name: name,
        id: key
      }

      users.push(user)
      
      // setSelectedUsers([...selectedUsers, name])
      setSelectedUsers(users)
     
      setText("")
      setUsers([])
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
              console.log(response)
              toast.success('user assign')
              // setSelectedUsers(response.data.data.assignTo)
            })
            .catch((error) => console.log(error))
    }

    const cancelClick = (e) => {
      e.preventDefault();
      handleAssignForm(false)
    }

    const handleDelete = async(e) => {
      try {
        e.preventDefault()
        let removeUserId = e.target.id
        let remainUsers = []
        console.log(removeUserId);
        // console.log(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/${taskId}/removeAssign/${removeUserId}`);

        // remainUsers = selectedUsersId.filter((user) => user.id !== removeUserId)
        // console.log(remainUsers);
        // setSelectedUsersId((prev) => [...remainUsers])
        // // setSelectedUsersId(remainUsers)
        // console.log("selectedUsersId", selectedUsersId);
        // // assignTask(e)
        let response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/${taskId}/removeAssign/${removeUserId}`)
        // console.log(response);
      } catch (error) {
       toast.error("Something went wrong")
      }
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
      
        
        

        <label htmlFor="assignUser" className="form-label relative block mb-4 text-white/90 focus-within:text-white">
            <input  className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-white/50  
                              [ transition-colors duration-200 ] 
                              [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                              [ bg-transparent focus:bg-transparent ] 
                              [ text-white focus:text-white ] 
                              [ border-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"           
                    type="text" 
                    name="assignUser" id="assignUser" 
                    placeholder="Select user to assign task" 
                    value={text}
                    onChange={findUsers}     
            />

        </label>
       
        {
          users.length >= 1  && (
            <ul className="form-label relative block mb-4 text-white/90 focus-within:text-white rounded-lg bg-transparent
                           [ border-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
            >
            <p className="uppercase font-bold [ text-sm md:text-sm lg:text-sm ] mt-2 ml-4">Suggestions:</p>
              {users.map((user) => (
                
                <li key={user._id}
                    className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-white/50  
                               [ transition-colors duration-200 ] 
                               [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                               [ bg-transparent hover:bg-purple-500 ] 
                               [ text-white hover:text-white ] "
                              //  [  border-b-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
                    onClick={selectedUsersList}
                    data-value={user.username}
                    data-key = {user._id}
                    value = {user}
                >{user.username}</li>
                
              ))}
            </ul>
          )
        }

        {
          selectedUsers.length > 0  && (
            <>
            <ul className="form-label relative block mb-3 text-white/90 focus-within:text-white rounded-lg bg-purplr-200
                           [ border-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
            >
              <p className="mb-1 uppercase font-bold [ text-md md:text-md lg:text-md ] mt-2 ml-4">Assign Task To:</p>
              {selectedUsers.map((user) => (
                <li key={user.id}
                    className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-white/50
                               flex justify-between  
                               [ transition-colors duration-200 ] 
                               [ py-2 pr-2 md:py-3 md:pr-3 lg:py-4 lg:pr-4 pl-5 ] 
                               [ bg-transparent hover:bg-purple-500 ] 
                               [ text-white hover:text-white ] "
                              //  [  border-b-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
                    
                    
                >{user.name}
                  <RxCross1 onClick={handleDelete} id={user.id} />
                </li>
              ))}
            </ul>
            </>
          )
        }
        <button onClick={assignTask} type='submit' className="form-input w-full rounded-lg font-bold text-white focus:outline-none
            [ p-3 md:p-4 lg:p-4 ]
            [ transition-colors duration-500 ] 
            [ bg-purple-700 hover:bg-purple-800 ] mb-5 hover:scale-[1.025] bottom-0">
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

export default AssignTaskForm