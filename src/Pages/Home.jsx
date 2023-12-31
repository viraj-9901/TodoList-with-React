import React, { useState, useRef } from 'react'
import Controller from '../components/Controller'
import List from '../components/List'
import TaskForm from '../components/TaskForm'
import { useSelector } from 'react-redux'

function Home() {

  const [tab, setTab] = useState(false)
  const [btnType, setBtnType] = useState([]);
  const [data, setData] = useState("")
  const [listData, setListData] = useState([])

  const authStatus = useSelector((state) => state.auth.status)

  function handleTab(value,type,info,){
    setTab(value)
    setBtnType(type)
    setData(info)
  }

  function taskList(tasks) {
    setListData(tasks)
  }

  const ref = useRef(null);

  return (
    <div ref={ref} className='relative flex justify-between top-[8vh] w-full h-full'>
        { authStatus?
         (<Controller className='w-[16%]' handleTab={handleTab} taskList={taskList} /> ) : null
        }
        <List className='w-[84%]' handleTab={handleTab} listData={listData} taskList={taskList}/>
        
        {tab? (
          <TaskForm handleTab={handleTab} reference={ref} type={btnType} data={data} taskList={taskList}/>
          ) : null
        }
        
    </div>
  )
}

export default Home