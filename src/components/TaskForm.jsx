import React from 'react'

function TaskForm() {
  return (
    <div className='absolute w-1/3 h-[70vh] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-slate-200 border-solid border-1 border-slate-600 bg-opacity-10 rounded-lg'>
        <h1 className='relative w-full h-[10%] mt-3 flex justify-center align-middle text-2xl font-semibold tracking-wider text-white'>
        Add Task
        </h1>
        
        <form className='relative mt-3 px-5 py-5'>

            <p className='border-b border-zinc-100 mt-3 '>
                <input type='text' name='title' placeholder='Tile' className='w-full h-10 p-3 bg-transparent text-xl text-black placeholder-gray-100 focus:placeholder-gray-700 focus:outline-none focus:bg-zinc-200'/>
            </p>

            <p className='border-b border-zinc-100 mt-5 '>
            <textarea type='text' name='description' placeholder='Description' className='w-full h-10 p-3 bg-transparent text-xl text-black placeholder-gray-100 focus:placeholder-gray-700 focus:outline-none focus:bg-zinc-200 overflow-y-auto'/>
            </p>

            <div className='relative mt-5'>
                <p className='border-b border-zinc-100 mt-3 bg-transparent text-white'>Priority</p>
                {/* <div>
                    <input type='radio' name='important' id='important' className='mr-2'/>
                    <label for='important'>Important</label>
                </div>
                <div>
                    <input type='radio' name='normal' id='normal' className='mr-2'/>
                    <label for='normal'>Normal</label>
                </div> */}
                <select name='priority' className='w-full border-0 focus:border-0'>
                    <option value="important">Important</option>
                    <option value="normal">Normal</option>
                </select>
               
            </div>

            <div className='relative mt-5'>
                <p className='border-b border-zinc-100 mt-3 bg-transparent text-white'>Status</p>
                {/* <div>
                    <input type='radio' name='pending' id='pending' className='mr-2' checked/>
                    <label for='pending'>Pending</label>
                </div>
                <div>
                    <input type='radio' name='hold' id='hold' className='mr-2'/>
                    <label for='hold'>Hold</label>
                </div>
                <div>
                    <input type='radio' name='completed' id='completed' className='mr-2'/>
                    <label for='completed'>Completed</label>
                </div> */}
                <select name='status' className='w-full border-0 focus:border-0'>
                    <option value="pending">Pending</option>
                    <option value="hold">Hold</option>
                    <option value="completed">Completed</option>
                </select>
               
            </div>

            <p className='border-b border-zinc-100 mt-5 bg-transparent '>
                <input type='text' name='dueDate' placeholder='due date: YYYY-MM-DD' className='w-full h-10 p-3 bg-transparent text-xl text-black placeholder-gray-100 focus:placeholder-gray-700 focus:outline-none focus:bg-zinc-200 required'/>
            </p>

            <div className='relative mt-3 px-3 py-5 flex justify-center'>
                <button className='w-60 rounded-lg p-3 bg-zinc-100 text-lg font-medium'>
                Add Task
                </button>
            </div>

            
        </form>
    </div>
  )
}

export default TaskForm