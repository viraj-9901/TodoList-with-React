import React, {useState} from 'react';
import { motion } from "framer-motion"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TaskForm({handleTab, reference}) {
    function cancelClick(){
        handleTab(false)
    }
    const [calOpen, setCalOpen] = useState(false)
    function HandleCalender(){
        setCalOpen(!calOpen)
    }

    let ValuePiece = Date | null;

    let Value = ValuePiece | [ValuePiece, ValuePiece];

    const [value, onChange] = useState(new Date());
    
  return (
    // <div className='relative flex justify-between top-[8vh] w-full h-full z-[50]'>

        <motion.div drag dragConstraints={reference} className="form-wrapper min-h-screen [ p-4 md:p-6 lg:p-8 ] [ flex justify-center items-center ]">
        <form class="signup-form w-[32rem] rounded-2xl text-[#1A2421] backdrop-blur-lg [ p-8 md:p-10 lg:p-10 ] [ bg-gradient-to-b from-white/60 to-white/30 ] [ border-[1px] border-solid border-white border-opacity-10 ] [ shadow-black/70 shadow-2xl ]">
        
            <h1 class="mb-4 uppercase font-bold [ text-xl md:text-2xl lg:text-2xl ]">TASK DETAILS</h1>
            

            <label htmlFor="title" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <input className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="text" name="title" id="title" placeholder="Title" />
            </label>

            <label htmlFor="description" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <textarea className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" type="text" name="description" id="description" placeholder="Description" />
            </label>

            <label  htmlFor="dueDate" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]">
            <p onClick={HandleCalender}  className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ]" name="dueDate" id="dueDate" placeholder="dueDate: YYYY-MM-DD">{Value}</p>
            </label>
            {
                calOpen?  (<Calendar onChange={console.log(value)} showWeekNumbers value={value} />) : null
            }

            <label htmlFor="priority" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333] 
                                            ">
                <select className='form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                                [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                                [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] '>
                    <option >Priority</option>
                    <option value='important'>important</option>
                    <option value='normal'>normal</option>
                </select>
            </label>

            <label htmlFor="status" className="form-label relative block mb-4 text-black/50 focus-within:text-[#333] 
                                            ">
                <select className='form-input block w-full rounded-lg leading-none focus:outline-none placeholder-black/50  
                                [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                                [ bg-black/20 focus:bg-black/25 ] [ text-[#333] focus:text-black ] '>
                    <option >Status</option>
                    <option value='pending'>pending</option>
                    <option value='hold'>hold</option>
                    <option value='completed'>completed</option>
                </select>
            </label>
        
            <button className="form-input w-full rounded-lg font-bold text-white focus:outline-none
            [ p-3 md:p-4 lg:p-4 ] 
            [ transition-colors duration-500 ] 
            [ bg-zinc-900 hover:bg-zinc-800 ]">
            ADD
            </button>


            <button onClick={cancelClick} className="form-input w-full rounded-lg font-bold text-white focus:outline-none mt-3
            [ p-3 md:p-4 lg:p-4 ] 
            [ transition-colors duration-500 ] 
            [ bg-red-800 hover:bg-red-700 ]">
            CANCEL
            </button>
        
        </form>
        </motion.div> 
    // </div>
  )
}

export default TaskForm