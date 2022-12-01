import Image from 'next/image';
import React from 'react'
import polygon from '../public/images/polygon.png'
import xend from '../public/images/Alchemy.svg'
import binance from '../public/images/binance.svg'
import chelsea from '../public/images/chelsea.svg'
import metamask from '../public/images/metamask.svg'
import coinbase from '../public/images/coinbase.svg'

const Partner = () => {
  return (
    <div >
        <div  className='flex  my-9 flex-col justify-center items-center'>
        <span className='text-4xl font-semibold'>Our Partners</span>
            <div className='grid grid-cols-3 md:grid-cols-6 mx-auto  justify-center items-center gap-3'>
            <Image className='lg:h-[140px] h-[80px] w-[80px] lg:w-[140px]' src={polygon} alt='polygon' />
            <Image  className='lg:h-[140px] h-[80px] w-[80px] lg:w-[140px]' src={xend}  alt='polygon'  />
            <Image className='lg:h-[140px] h-[80px] w-[80px] lg:w-[140px]' src={binance}  alt='polygon' />
            <Image className='lg:h-[80px] h-[30px] w-[30px] lg:w-[80px]' src={chelsea}  alt='polygon' />
            <Image className='lg:h-[80px] h-[30px] w-[30px] lg:w-[80px]' src={metamask}  alt='polygon' />
            <Image className='lg:h-[140px] h-[80px] w-[80px] lg:w-[140px]' src={coinbase} alt='polygon' />
            </div>

        </div>
    </div>
  )
}

export default Partner;