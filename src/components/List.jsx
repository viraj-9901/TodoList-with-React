import React, { useRef, useEffect, useState } from 'react';
import Card from './Card'
import axios from 'axios'
import {useSelector} from 'react-redux'

function List({reference, handleTab}) {
  const ref = useRef(null)

  const authStatus = useSelector((state) => state.auth.status)
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true)
  const username = window.location.pathname.split('/')[2]
  
  useEffect(() => {

    if(authStatus === true){
      axios.get(`http://localhost:8080/user/${username}`,
      {
        withCredentials: true,  
      })
      .then(response => setData(response.data.message))
      .catch((error) => console.log(error))
     
    }
  },[authStatus])

    // {
    //   title:'test1',
    //   description: 'test1 description',
    //   dueDate: '2024-01-05',
    //   priority: 'important',
    //   status: 'hold'
    // },
  

  // let filteredData = data.filter(task => task.priority === "important" && task.status === "hold");
  return (
    <div ref={ref} className='relative w-full h-screen flex flex-wrap gap-14 p-5 bg-transparent overflow-scroll'>
        {
          
          data.map((item,key) => (
            <Card data={item} reference={ref} index={key} handleTab={handleTab}/>
          ))
        }
        {/* <Card handleTab={handleTab} data={this}/>
        <Card handleTab={handleTab}/> */}
        

        
    </div> 
  )
}

export default List