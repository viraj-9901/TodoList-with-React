import React, { useRef } from 'react';
import Card from './Card'


function List({reference, handleTab}) {
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
      priority: 'normal',
      status: 'pending'
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
      priority: 'normal',
      status: 'completed'
    }

  ]

  let filteredData = data.filter(task => task.priority === "important" && task.status === "hold");
  return (
    <div ref={ref} className='relative w-full h-screen flex flex-wrap gap-14 p-5 bg-transparent overflow-scroll'>
        {

          filteredData.map((item,key) => (
            <Card data={item} reference={ref} index={key} handleTab={handleTab}/>
          ))
        }
        {/* <Card handleTab={handleTab} data={this}/>
        <Card handleTab={handleTab}/> */}
        

        
    </div> 
  )
}

export default List