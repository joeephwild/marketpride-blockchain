import Image from "next/image";
import { motion } from "framer-motion";
import avatar from "../public/images/avatar.png";
import React, { useContext } from "react";
import hero from "../public/images/image7.webp";
import { MarketPrideContext } from "../context/MarketPrideContext";
import { Web3Button } from "@web3modal/react";


const style = {
  wrapper: ' grid grid-cols-1 bg-[#10100e] text-[#FFFFE3] md:grid-cols-2 gap-3',
  image: "w-full my-9",
  textWrapper: 'max-w-[500px] flex flex-col text-center items-center justify-center space-y-2.5',
  heading: 'md:text-6xl text-5xl font-extrabold leading-[60px] tracking-wider mb-[20px]  uppercase',
  text: 'text-[22px] max-w-[25rem] md:max-w-[23rem]  mb-[20px]',
  button: 'border-[#fff] border-2 mb-5 px-4 py-2 rounded-full'
}
//NEXTGENTRADINGPLATFORM  The future of E-commerce is yours to shape. Connect a wallet and enjoy a new world trading on the ethereum blockchain.
const Hero = () => {
  return (
    <div>
      <section className={style.wrapper}>
        <div className='mx-6 mt-[30%]'>
        <div className={style.textWrapper}>
          <h2 className={style.heading}>If you can dream it, you can sell it with MarketPride</h2>
          <p className={style.text}>Build your business here. Take it anywhere.</p>
          <div>
           <button className="text-lg text-[#10100e] bg-[#FFFFE3] px-4 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300">Learn More</button>
          </div>
        </div>
        </div>
        <Image src={hero} className={style.image} alt="banner"/>
      </section>
    </div>
  );
};

export default Hero;
