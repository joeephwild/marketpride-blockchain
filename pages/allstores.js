import React from 'react'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Stores from '../components/Stores'
import { FaSearch } from 'react-icons/fa'

const allstores = () => {
  return (
    <div>  
        <Navbar />
        <div className=''>
        <div className="hidden sm:flex  items-center rounded-md justify-center h-26 cursor-pointer">
              <input type="text" className="p-2 border-2 border-[#10100e] h-full w-[60%]  rounded-l-md focus:outline-none px-4"/>
             <FaSearch className="h-fit w-fit bg-[#10100E] text-white p-4"/>
          </div>
          <div>
            <Stores />
          </div>
        </div>
    </div>
  )
}

export default allstores