import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {

  const navigate = useNavigate()
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  
  const registerUser = async (e) => {
    e.preventDefault()

      const formData = new FormData();
       formData.append("username", e.target.username.value);
       formData.append("email", e.target.email.value);
       formData.append("password", e.target.password.value);
       console.log(formData);

    await axios.post(`${process.env.URI_DOMAIN_PORT}/user/register`, formData,    
          {
            headers:{'Content-Type': 'multipart/form-data'}
          }
          )
         .then((response) => {
            navigate(`/user/login`)
            toast.success(response.data.message);
          })
         .catch((error) => toast.error(error.response.data.error.message))
  }

  return (
    <div className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
      <form onSubmit={registerUser} className="signup-form max-w-sm rounded-2xl text-[#1A2421] backdrop-blur-lg [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
      
        <h3 className="mb-1 text-md text-[#1A2421]/80">Registration required!</h3>
        <h1 className="mb-4 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">Register User</h1>
        <p className="mb-4 [ text-sm text-[#1A2421]/70 text-opacity-50 ]">Enter a username, email &amp; password in the fields below to get register.</p>
      
        <div className="avatar flex justify-center">
            <div className="relative mb-4 w-24">
                <img
                    className='rounded-full'
                    alt='profile'
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>

        <label htmlFor="text" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="text" name="username" id="username" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label htmlFor="email" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>

        <label htmlFor="password" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>

        {/* <label htmlFor="profile" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                            [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                            [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] 
                            file:bg-transparent file:border-0 file:py-2 file:hidden file:" 
                            type="file" name="profile" id="profile" placeholder="Profile Photo" 
                            onSelect={(value) => {
                                let fileName = value.name;
                                setProfile(fileName)
                            }} value={profile} />
       
        </label> */}
       
        <button type='submit'
          className="form-input w-full rounded-lg font-bold text-white focus:outline-none
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-zinc-900 hover:bg-zinc-800 ]">  
          Register
        </button>
      
        <div className="form-footer mt-8 text-center">
        <p className="text-xs">Already have account? 
          <button className='text-white hover:text-green-900 [ transition-colors duration-500 ]'>
          <Link to='/user/login'>
            Login User
          </Link> 
          </button>
        </p>
        </div>
      </form>
    </div> 
  )
}

export default Register