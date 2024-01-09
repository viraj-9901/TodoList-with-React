import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios'
import {useDispatch} from 'react-redux';
import {login as authLogin} from '../store/authSlice';
import toast from 'react-hot-toast';

function Login() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);

    await axios.post(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/login`, formData,    
          {
            headers:{'Content-Type': 'multipart/form-data'},
            withCredentials: true,
          }
          )
         .then((response) => {
            navigate(`/user/${response.data.data.user.username}`)
            const userData = {
                                username:response.data.data.user.username,
                                email:response.data.data.user.email
                              }
            dispatch(authLogin(userData))
            toast.success(response.data.message);
            console.log(response);
          })
         .catch((error) => toast.error(error.response.data.error.message))

  }
  return (
    <div className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
      <form onSubmit={loginUser} className="signup-form max-w-sm rounded-2xl text-[#1A2421] backdrop-blur-lg [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
      
        <h3 className="mb-1 text-md text-[#1A2421]/80">Registration required!</h3>
        <h1 className="mb-6 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">Login User</h1>
        <p className="mb-6 [ text-sm text-[#1A2421]/70 text-opacity-50 ]">Enter a valid username &amp; password in the fields below to get started.</p>
      
        <label htmlFor="username" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="text" name="username" id="username" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label htmlFor="password" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className="form-input w-full rounded-lg font-bold text-white focus:outline-none
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-zinc-900 hover:bg-zinc-800 ]">
            Login
        </button>
       
      <div className="form-footer mt-8 text-center">
        <p className="text-xs">Don't have account? 
          <button className='text-white hover:text-green-900 [ transition-colors duration-500 ]'>
          <Link to='/user/register'>
            Register User
          </Link>
          </button>
        </p>
      </div>
      </form>
    </div>
  )
}

export default Login