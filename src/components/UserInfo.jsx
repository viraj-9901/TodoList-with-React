import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import {useSelector} from 'react-redux';
import { FaLongArrowAltLeft } from "react-icons/fa";

function UserInfo() {
  
  const user = useSelector((state) => state.auth.userData);
  const username = window.location.pathname.split('/')[2] ;

  const navigate = useNavigate()

  function homePage(){
    navigate(-1)  
  }

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

  let createdAt = new Date().dateFormat(new Date(user.createdAt))
//   let updatedAt = new Date().dateFormat(new Date(user.updatedAt))

  return (
    <div className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
      <div className="signup-form max-w-sm rounded-2xl text-[#1A2421] backdrop-blur-lg [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
      
        <h1 className="mb-6 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">User Info</h1>

        <label htmlFor="username" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <h5 className="block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" >
            {user.username}
          </h5>
        </label>

        <label htmlFor="email" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
        <h5 className="block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]"  >
            {user.email}
          </h5>
        </label>

        <label htmlFor="createdAt" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
        <h5 className="block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" >
            {createdAt}
          </h5>
        </label>

        {/* <label htmlFor="updatedAt" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
        <h5 className="block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]"  >
            {updatedAt}
          </h5>
        </label> */}


        <button onClick={homePage} className="w-full rounded-lg font-bold text-white focus:outline-none
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-zinc-900 hover:bg-zinc-400 hover:text-black]
          flex items-center">
            <FaLongArrowAltLeft className='mr-5'/>
            Back to home page
        </button>

        <div className="mt-8 text-center">
        <p className="text-xs">Want to update info? 
          <button className='text-white hover:text-green-900 [ transition-colors duration-500 ]'>
          <Link to={`/user/${username}/updateUser`}>
            Update User
          </Link> 
          </button>
        </p>
        </div>
       
      
      </div>
    </div>
  )
}

export default UserInfo