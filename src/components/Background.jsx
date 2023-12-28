import React from 'react'

function Background() {
  return (
    <div className='fixed w-full h-screen z-[2]'>
        {/* <div className='absolute top-[4%] w-full py-10 flex justify-center text-xl font-semibold text-zinc-600'>ToDo-List</div> */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tighter text-zinc-900 font-semibold">Tasks.</h1>
    </div>
  )
}

export default Background