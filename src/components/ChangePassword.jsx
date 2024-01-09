import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';  
import axios from 'axios'
import toast from 'react-hot-toast';

function ChangePassword() {
  
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = async (e) => {
    e.preventDefault()
    const username = window.location.pathname.split('/')[2]

    const formData = new FormData();
    formData.append("oldPassword", e.target.oldPassword.value);
    formData.append("newPassword", e.target.newPassword.value);

    await axios.put(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/changePassword`, formData,    
          {
            headers:{'Content-Type': 'multipart/form-data'},
            withCredentials: true,
          }
          )
         .then((response) => {
            console.log(response)
            navigate(-1)
            toast.success(response.data.message);
            console.log(response);
          })
         .catch((error) => toast.error(error.response.data.error.message))

  }

  function cancelChange (){
    navigate(-1)
  }
  return (
    <div className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
      <form onSubmit={handleChange} className="signup-form max-w-sm rounded-2xl text-[#1A2421] backdrop-blur-lg [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
      
        {/* <h3 className="mb-1 text-md text-[#1A2421]/80">Change Password</h3> */}
        <h1 className="mb-6 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">Change Password</h1>
        <p className="mb-6 [ text-sm text-[#1A2421]/70 text-opacity-50 ]">Enter a valid old password &amp; new password in the fields below to update password.</p>
      
        <label htmlFor="oldPassword" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" 
                 type="password" name="oldPassword" id="oldPassword" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </label>

        <label htmlFor="newPassword" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
          <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" 
                 type="password" name="newPassword" id="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>

        <button type='submit' className="form-input w-full rounded-lg font-bold text-white focus:outline-none mb-3
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-zinc-900 hover:bg-zinc-800 ]">
            Change Password
        </button>

        <button onClick={cancelChange} className="form-input w-full rounded-lg font-bold text-white focus:outline-none
          [ p-3 md:p-4 lg:p-4 ] 
          [ transition-colors duration-500 ] 
          [ bg-red-800 hover:bg-red-700 ]">
            Cancel
        </button>
       
      </form>
    </div>
  )
}

export default ChangePassword