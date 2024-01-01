import React, { useRef } from 'react';
import Card from './Card'
import TaskForm from '../components/TaskForm'

function List({reference, handleTab}) {
  // const [tab, setTab] = useState(false)
  // function handleTab(value){
  //   setTab(value)
  // }
  const ref = useRef(null)

  const data = [
    {
      title:'test1',
      description: 'test1 description',
      dueDate: '2024-01-05',
      priority: 'important',
      status: 'hold'
    },
    {
      title:'test2',
      description: 'test1 description',
      dueDate: '2024-01-05',
      priority: 'important',
      status: 'hold'
    },
    {
      title:'test3',
      description: 'test1 description',
      dueDate: '2024-01-05',
      priority: 'important',
      status: 'hold'
    },
    {
      title:'test4',
      description: 'test1 description',
      dueDate: '2024-01-05',
      priority: 'important',
      status: 'hold'
    }

  ]
  return (
    <div ref={ref} className='relative w-full h-screen flex flex-wrap gap-14 p-5 bg-transparent overflow-scroll'>
        {
            data.map((item,key) => (
                <Card data={item} reference={ref} index={key} handleTab={handleTab}/>
            ))
        }
        {/* <Card handleTab={handleTab} data={this}/>
        <Card handleTab={handleTab}/> */}
        {/* <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/> */}

        {/* {tab? (
          <TaskForm handleTab={handleTab} reference={reference} />
          ) : null
        } */}
    </div> 
  )
}

export default List