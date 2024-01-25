import React, {useEffect, useRef, useState} from 'react';
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios'
import {useDispatch} from 'react-redux';
import {logout as authLogout} from '../store/authSlice'
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let profileRef = useRef()
    const [menu, setMenu] = useState(false)

    const username = window.location.pathname.split('/')[2] 

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('loginStatus')) === true){
            profileRef.current.src = `${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/profile`
        }
    },[window.location.reload, localStorage.getItem('loginStatus')])

    //logout user API integration
    async function logoutUser(){
        await axios.post(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/logout`,{},{
            withCredentials: true,
        })
            .then((response) => {
                dispatch(authLogout(false))
                localStorage.setItem('loginStatus', false)
                navigate('/')
                toast.success(response.data.message)
            })
            .catch((error) => toast.error(error.response.data.error.message))
        
        setMenu(false)
     
    }


  return (
    <>
    <div className='fixed w-full h-[6vh] top-[2%] bg-transparent-100 flex justify-between border-b border-zinc-100 border-opacity-10'>
        <h1 className='w-[88%] flex justify-start items-center ml-12 text-2xl font-semibold tracking-widest text-gray-50 cursor-pointer'>
            <Link to='/'>
                Todo-List
            </Link> 
        </h1>
        <div className='w-[12%] flex justify-between mr-16 items-center'>
            <button className={`relative rounded-lg font-semibold text-white items-center focus:outline-none 
                               [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] 
                              [ bg-transparent hover:bg-blue-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2
                              ${JSON.parse(localStorage.getItem('loginStatus')) === true? "invisible pointer-events-none" : "visible"}
                              `}    
            >
                <Link to='/user/register'>
                    Register
                </Link> 
            </button>

            <button className={`relative rounded-lg font-semibold text-white items-center focus:outline-none 
                              [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] 
                              [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2
                              ${JSON.parse(localStorage.getItem('loginStatus')) === true? "invisible pointer-events-none" : "visible"}`}
            >
                <Link to='/user/login'>
                    Login
                </Link> 
            </button>

            { 
             (JSON.parse(localStorage.getItem('loginStatus')) === false)? (
                <button onClick={() => setMenu(!menu)} className='relative rounded-full font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-purple-300 hover:bg-opacity-25 ] hover:bottom-[5%]'> 
                    {menu? <RxCross2 className='w-5 h-4'/> : <FaUserLarge className='w-5 h-4'/>}
                    {/* <img src=${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/profile` alt='profile' className='w-5 h-4' /> */}
                    {/* <img ref={profileRef} alt='profile' className='w-4 h-5' /> */}
                </button>) : (

                <img onClick={() => setMenu(!menu)} 
                    className='relative rounded-full font-semibold text-white items-center focus:outline-none 
                                [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] 
                                [ bg-transparent hover:bg-purple-300 hover:bg-opacity-25 ] 
                                hover:bottom-[5%] w-[3.5rem] h-[3.5rem]'
                    ref = {profileRef}     
                    // src = {`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/profile`}   
                />)
            }
        </div>
    </div>

    {  menu && JSON.parse(localStorage.getItem('loginStatus')) ? (
    <div className='fixed w-60 h-screen top-[8vh] flex flex-col bg-zinc-800/90 bg-opacity-5 border-l border-zinc-700 right-0 pt-5 z-[20]  '>
        
       

        <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none 
                                                [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-blue-300 hover:bg-opacity-25 ] mb-3'>
             <Link to={`/user/${username}/avatar`}>
                Change Avatar
            </Link>
        </button>
        <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none 
                                                [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] mb-3'>
            <Link to={`/user/${username}/changePassword`}>
                Change Password
            </Link>
        </button>
        
        <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none 
                          [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-blue-300 hover:bg-opacity-25 ] mb-3'>
            <Link to={`/user/${username}/userInfo`}>
                User Info
            </Link>
        </button>
        <button className='relative rounded-lg font-semibold text-white items-center focus:outline-none 
                          [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] mb-3'>
            <Link to={`/user/${username}/updateUser`}>
                Update User
            </Link>
        </button>
        
        <button onClick={logoutUser} className='relative rounded-lg font-semibold text-white items-center focus:outline-none 
                                                [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-violet-300 hover:bg-opacity-25 ] mb-3'>
            Logout
        </button>
    </div> ) : null
    }
    </>
  )
}

export default Navbar