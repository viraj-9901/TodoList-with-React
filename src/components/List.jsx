import React from 'react';
import Card from './Card'

function List() {
  return (
    <div className='relative w-full h-screen flex flex-wrap gap-14 p-5 bg-transparent overflow-scroll'>
        {/* {
            data.map((item,key) => (
                <Card data={item} reference={ref} index={key}/>
            ))
        } */}
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
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div> 
  )
}

export default List