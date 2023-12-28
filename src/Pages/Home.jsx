import React from 'react'
import Controller from '../components/Controller'
import List from '../components/List'

function Home() {
  return (
    <div className='relative flex justify-between top-[8vh] w-full h-full'>
        <Controller className='w-[25%]'/>
        {/* <List className='w-[75%]'/> */}
    </div>
  )
}

export default Home