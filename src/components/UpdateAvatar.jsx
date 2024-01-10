import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdateAvatar() {

  const navigate = useNavigate()

  const [profile, setProfile] = useState("")
  
  //function: upload profile photo
  const uploadProfile = async (e) => {
    e.preventDefault()
    // console.log(e.target.profile.files);
    const formData = new FormData();
    let image = e.target.profile.files[0];
    const username = window.location.pathname.split('/')[2]
    
    formData.append('profile', image)

    await axios.post(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/uploadProfile`,formData,
    {
        headers:{'Content-Type': 'multipart/form-data'},
        withCredentials: true,
    }
    )
    .then((response) => {
        navigate(-1)
        toast.success(response.data.message)
    })
    .catch((error) => toast.error(error))

   


  }

  //function: remove profile photo
  const removeProfile = (e) => {
    e.preventDefault()
  }

  //function: cancel buntton
  function cancelAvatar(e){
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
      <form onSubmit={uploadProfile} className="signup-form max-w-sm rounded-2xl text-[#1A2421] backdrop-blur-lg [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
      
        <h1 className="mb-4 text-center font-bold [ text-xl md:text-2xl lg:text-2xl ]">Profile picture</h1>
    
      
        <div className="avatar flex justify-center">
            <div className="relative mb-4 w-28">
                <img
                    className='rounded-full'
                    alt='profile'
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>

        <label htmlFor="profile" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                            [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                            [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] 
                            file:bg-transparent file:border-0 file:py-2 file:hidden file:" 
                            type="file" name="profile" id="profile" placeholder="Profile Photo" 
                            onSelect={(value) => {
                                // let fileName = value.name;
                                setProfile(value)
                            }} />
        </label>
        
        <button onClick={removeProfile}
          className="form-input w-full rounded-lg font-bold text-white focus:outline-none mb-3
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-zinc-900 hover:bg-zinc-800 ]">  
          Remove Profile Picture
        </button>
        
        <button type='submit'
          className="form-input w-full rounded-lg font-bold text-white focus:outline-none mb-3
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-zinc-900 hover:bg-zinc-800 ]">  
          Update
        </button>
        
        <button onClick={cancelAvatar}
          className="form-input w-full rounded-lg font-bold text-white focus:outline-none
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-red-900 hover:bg-red-800 ]">  
          Cancel
        </button>
      
      </form>
    </div> 
  )
}

export default UpdateAvatar