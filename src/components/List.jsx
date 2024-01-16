import React, { useRef, useEffect, useState } from 'react';
import Card from './Card'
import axios from 'axios'
import {useSelector} from 'react-redux';

function List({reference, handleTab, listData, taskList}) {
  const ref = useRef(null)

  const authStatus = useSelector((state) => state.auth.status)
  const [data, setData] = useState([])
  
  const username = window.location.pathname.split('/')[2]
  
  useEffect(() => {
    if(authStatus === true){
      (async () => { 
        let response = await axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}`,
          {
            withCredentials: true 
          })
        setData(response.data.message)
      })()
    }
  },[authStatus,username])

  function refreshData(value) {
    taskList(value)
  }

  // let filteredData = data.filter(task => task.priority === "important" && task.status === "hold");
  return (
    <div ref={ref} className='relative w-full h-screen flex flex-wrap gap-14 p-5 bg-transparent overflow-scroll'>
        {
          (listData.length !== 0) ? 
          (
            listData.map((item) => (
              <Card data={item} reference={ref} handleTab={handleTab} refreshData={refreshData} key={item._id} />
            ))
          ) : (
            data.map((item) => (
              <Card data={item} reference={ref} handleTab={handleTab} refreshData={refreshData} key={item._id}/>
            ))
          )
        }  
    </div> 
  )
}

export default List