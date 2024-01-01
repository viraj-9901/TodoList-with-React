import React, { useState, useRef } from 'react'
import Controller from '../components/Controller'
import List from '../components/List'
import TaskForm from '../components/TaskForm'

function Home() {
  const [tab, setTab] = useState(false)
  const [btnType, setBtnType] = useState("");
  const [data, setData] = useState("")

  function handleTab(value,type,info){
    setTab(value)
    setBtnType(type)
    setData(info)
  }

  const ref = useRef(null);

  return (
    <div ref={ref} className='relative flex justify-between top-[8vh] w-full h-full'>
        <Controller className='w-[16%]' handleTab={handleTab}/>
        <List className='w-[84%]' handleTab={handleTab}/>
        {tab? (
          <TaskForm handleTab={handleTab} reference={ref} type={btnType} data={data}/>
          ) : null
        }
        {/* {tab? (
          <TaskForm2 className='relative top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-[40]' handleTab={handleTab}/>
          ) : null
        } */}
    </div>
  )
}

export default Home