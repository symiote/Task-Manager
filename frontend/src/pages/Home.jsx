import React from 'react'
import Sidebar from '../components/home/sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-4'>
      <div className='w-1/6 p-4 shadow-sm border-gray-100 border-1 rounded-xl bg-white flex flex-col justify-between'><Sidebar/></div>
      <div className=' w-5/6 p-4 shadow-sm border-gray-100 border-1 rounded-xl bg-white '><Outlet/></div>
    </div>
  )
}

export default Home
