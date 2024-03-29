import React, { useState, useRef } from 'react'
import Controller from '../components/Controller'
import List from '../components/List'
import TaskForm from '../components/TaskForm'
import { useSelector } from 'react-redux'
import AssignTaskForm from '../components/AssignTaskForm'

function Home() {

  const [tab, setTab] = useState(false)
  const [btnType, setBtnType] = useState([]);
  const [data, setData] = useState("")
  const [listData, setListData] = useState([])
  const [assignCard, setAssignCard] = useState(false)
  const [taskData, setTaskData] = useState("")

  let authStatus = useSelector((state) => state.auth.status)
  let localAuthStatus = localStorage.getItem('loginStatus')

  function handleTab(value,type,info){
    setTab(value)
    setBtnType(type)
    setData(info)
  }

  function taskList(tasks) {
    setListData(tasks)
  }

  function handleAssignForm(value,info){
    setAssignCard(value)
    setTaskData(info)
  }

  const ref = useRef(null);

  return (
    <div ref={ref} className='relative flex justify-between top-[8vh] w-full h-full'>
        { authStatus || localAuthStatus ?
         (
          <>
            <Controller className='w-[16%]' handleTab={handleTab} taskList={taskList} /> 
            
            <List className='w-[84%]' handleTab={handleTab} listData={listData} taskList={taskList} handleAssignForm={handleAssignForm} />
        
            {tab? (
              <TaskForm handleTab={handleTab} reference={ref} type={btnType} data={data} taskList={taskList} />
              ) : null
            }

            { assignCard ? (
                <AssignTaskForm handleAssignForm={handleAssignForm} data={taskData} reference={ref} taskList={taskList} />
              ) : null
            }

          </>
         ) : null 
        }
        
    </div>
  )
}

export default Home