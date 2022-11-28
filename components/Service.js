import Image from 'next/image';
import React from 'react'

const Service = ({ image, title, text}) => {
  return (
    <div>
         <div className='flex px-4 flex-col my-6 items-start md:items-center space-y-'>
      <div></div>
        <Image src={image} width={80} height={80} alt='image' />
        <span className='text-lg font-bold'>{title}</span>
        <span className='text-sm'>{text}</span>
    </div>
    </div>
  )
}

export default Service;