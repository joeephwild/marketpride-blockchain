import React from 'react'
import matic from "../public/images/matic.webp";

const StoreCard = ({item}) => {
  console.log(item);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div>
       <div className="md:max-w-[250px] max-w-[150px] h-[350px] mx-auto rounded-lg bg-[#10100e] container">
        <img src={item.imageUrl} className="h-52 w-full overflow-hidden object-fit lg:object-cover" />
        <div className="flex items-center w-fit space-y-2  px-1.5 text-[#fffffe] flex-col">
          <span className="text-lg text-center font-bold">{truncate(item.name, 19)}</span>
          <span className='text-[#fffffe] text-sm'>{item.creator.slice(1,9)}...{item.creator.slice(38, 49)}</span>
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