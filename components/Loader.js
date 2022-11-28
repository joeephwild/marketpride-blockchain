import React, { useState, useEffect } from 'react';
import logo from '../public/images/favicon.svg';
import Image from "next/image";
import { motion } from 'framer-motion';

const Loader = () => {
        const [count, setCount] = useState(0);
        const [test, setTest] = useState(true);

        useEffect(() => {
            let counter = setTimeout(() => {
                setCount(count + 1);
                if (count === 100) {
                  setCount(0);
                  setTest(false);
                }
              }, 20);
              return () => clearTimeout(counter);
        }, [])
        
  return (
    <motion.div className='bg-[#10100e] h-screen w-screen fixed z-[8888888] justify-center items-center flex flex-col'>
           <div className='flex items-center space-x-2'>
                <Image src={logo} width={60} height={60} objectFit="contain" />
                <div className='flex items-center text-4xl text-[#FFFFE3] animate-pulse font-ClashDisplay-Regular'>
                    <span>MarketPride</span>
                </div>
            </div>
            <h3 className='text-[#FFFFE3] text-3xl text-end'>{test && count}%</h3>
    </motion.div>
  )
}

export default Loader;