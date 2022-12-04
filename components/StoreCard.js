import React from 'react'
import matic from "../public/images/matic.webp";

const StoreCard = ({item}) => {
  console.log(item);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className='mt-9 mx-auto'>
       <div className="md:max-w-[210px] w-[82%] mx-6 rounded-lg bg-[#10100e] container">
        <img src={item.imageUrl} className="h-52 w-full overflow-hidden  lg:object-cover" />
        <div className="flex items-center justify-center w-fit py-2 space-y-2.5 px-1.5 text-[#fffffe] flex-col">
          <span className="text-lg flex items-center justify-center font-bold">{truncate(item.name, 19)}</span>
          <span className='bg-[#fffffe] text-[#10100e] px-2 py-1.5 text-sm'>{item.creator.slice(1,9)}...{item.creator.slice(30, 49)}</span>
          <span className="text-xs text-wrap ">{truncate(item.description, 29)}</span>
          <div className="flex items-center px-3 justify-between w-full">
          </div>
          <button className="bg-[#fffffe] text-sm  flex justify-center w-full mb-3 text-[#10100e] px-4.5 py-2.5 rounded-lg">Details</button>
        </div>
      </div>
    </div>
  )
}

export default StoreCard