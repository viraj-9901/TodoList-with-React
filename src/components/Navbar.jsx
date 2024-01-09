import React, {useState} from 'react';
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios'
import {useDispatch} from 'react-redux';
import {logout as authLogout} from '../store/authSlice'
import {useSelector} from 'react-redux'
import toast from 'react-hot-toast';

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)

    const authStatus = useSelector((state) => state.auth.status)
    const username = window.location.pathname.split('/')[2] 

    function handleMenu(){
        setMenu(!menu)
    }

    //logout user API integration
    async function logoutUser(){
        await axios.post(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/logout`,{},{
            withCredentials: true,
        })
            .then((response) => {
                dispatch(authLogout(false))
                navigate('/')
                toast.success(response.data.message)
            })
            .catch((error) => toast.error(error.response.data.error.message))
        
        handleMenu()
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
                            ${(authStatus === true)? "invisible pointer-events-none" : "visible"}`}
                           
            >
                <Link to='/user/register'>
                    Register
                </Link> 
            </button>

            <button className={`relative rounded-lg font-semibold text-white items-center focus:outline-none 
                              [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] 
                              [ bg-transparent hover:bg-indigo-300 hover:bg-opacity-25 ] hover:bottom-[5%] mr-2
                              ${(authStatus === true)? "opacity-0 pointer-events-none" : "opacity-100"} `}
                    disabled={authStatus}
            >
                <Link to='/user/login'>
                    Login
                </Link> 
            </button>

            <button onClick={handleMenu} className='relative rounded-full font-semibold text-white items-center focus:outline-none [ p-3 md:p-3 lg:p-3 ] [ transition-colors duration-500 ] [ bg-transparent hover:bg-purple-300 hover:bg-opacity-25 ] hover:bottom-[5%]'>
                <FaUserLarge className='w-5 h-4'/>
            </button>
        </div>
    </div>

    { ( menu && authStatus ) ? (
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
            User Info
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