import React from 'react';
import Card from './Card'

function List() {
  return (
    <div className='fixed top-[8vh] left-0 w-full h-full flex flex-wrap gap-10 p-5 bg-blue-200'>
        {/* {
            data.map((item,key) => (
                <Card data={item} reference={ref} index={key}/>
            ))
        } */}
        <Card/>
    </div> 
  )
}

export default List