import Image from "next/image";
import { motion } from "framer-motion";
import avatar from "../public/images/avatar.png";
import React, { useContext } from "react";
import hero from "../public/images/hero.png";
import { MarketPrideContext } from "../context/MarketPrideContext";
import { parentVariants } from "../animation";
import { Web3Button } from "@web3modal/react";

//NEXTGENTRADINGPLATFORM  The future of E-commerce is yours to shape. Connect a wallet and enjoy a new world trading on the ethereum blockchain.
const Hero = () => {
  const { connectWallet, account } = useContext(MarketPrideContext);
  const Text1 = ["N", "E", "X", "T"];
  const Text3 = ["G", "E", "N"];
  const Text2 = ["P", "L", "A", "T", "F", "O", "R", "M"];
  const Text = ["T", "R", "A", "D", "I", "N", "G"];

  const transition = {
    duration: 0.8,
    ease: [0.6, -0.05, 0.01, 0.9],
  };
  return (
    <div>
      <section className="flex flex-col items-center px-9 ">
        <div className="lg:space-y-8 mt-8 space-y-6 flex flex-col items-center">
          <motion.div  initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                staggerChildren: 0.1,
                delayChildren: 4.5,
              }} className="flex font-ClashDisplay-Semibold  flex-col items-center font-black">
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                staggerChildren: 0.1,
                delayChildren: 3.5,
              }}
              className="flex"
            >
              {Text1.map((item, i) => (
                <motion.span
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...transition, duration: 1 }}
                  className='md:text-[90px] text-[60px] lg:text-[100px] leading-[90px]'
                  key={i}
                >
                  {item}
                </motion.span>
              ))}
              <motion.div
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  staggerChildren: 0.1,
                  delayChildren: 3.5,
                }}
                className="flex overflow-hidden space-x-5 items-center"
              >
                {Text3.map((item, i) => (
                  <motion.span
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{ ...transition, duration: 1 }}
                    className='md:text-[90px] text-[60px] lg:text-[100px] leading-[90px]'
                    key={i}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                staggerChildren: 0.1,
                delayChildren: 3.5,
              }}
              className="r"
            >
              {Text.map((item, i) => (
                <motion.span
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...transition, duration: 1 }}
                  className='md:text-[90px] text-[60px] lg:text-[100px] leading-[90px]'
                  key={i}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                staggerChildren: 0.1,
                delayChildren: 3.5,
              }}
              className=""
            >
              {Text2.map((item, i) => (
                <motion.span
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...transition, duration: 1 }}
                  className='md:text-[90px] text-[60px] lg:text-[90px] leading-[90px]'
                  key={i}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{
            y: "120%",
            opacity: 0,
          }}
          whileInView={{
            y: "0",
            opacity: 1,
          }}
          className="flex mt-6 items-center w-[90%] md:w-[70%] text-sm lg:text-xl font-bold text-center"
        >
          The future of E-commerce is yours to shape. Connect a wallet and enjoy
          a new world trading on the ethereum blockchain.
        </motion.div>
        <div className="my-8">
          <Web3Button />
        </div>
      </section>
    </div>
  );
};

export default Hero;
