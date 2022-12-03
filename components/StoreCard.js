import React from 'react'

const StoreCard = ({item}) => {
  return (
    <div>
        <div className='flex items-center justify-center'>
         <img src={item.coverImage} alt='imgage' className='h-36 w-36' />
        </div>

    </div>
  )
}

export default StoreCard