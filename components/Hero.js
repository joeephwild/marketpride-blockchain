import Image from "next/image";
import avatar from "../public/images/avatar.png";
import React, { useContext } from "react";
import hero from "../public/images/hero.png";
import { MarketPrideContext } from "../context/MarketPrideContext";

//NEXTGENTRADINGPLATFORM  The future of E-commerce is yours to shape. Connect a wallet and enjoy a new world trading on the ethereum blockchain.
const Hero = () => {
  const { connectWallet, account } = useContext(MarketPrideContext);
  const text1 = ["N", "E", "X", "T"];
  const text2 = ["G", "E", "N"];
  return (
    <div>
      <section className="flex flex-col items-center px-9 ">
        <div className="lg:space-y-8 md:text-[90px] text-[60px] lg:text-[100px] flex flex-col items-center">
          <div className="flex font-ClashDisplay-Semibold flex-col leading-snug items-center font-black">
            <div>NEXT GEN</div>
            <div className="">TRADING</div>
            <div className="">PLATFORM</div>
          </div>
        </div>
        <div className="flex mt-6 items-center w-[90%] md:w-[70%] text-sm lg:text-xl font-bold text-center">
          The future of E-commerce is yours to shape. Connect a wallet and enjoy
          a new world trading on the ethereum blockchain.
        </div>
        <div className="my-8">
        </div>
      </section>
    </div>
  );
};

export default Hero;
