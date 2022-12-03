import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";
import errors from '../public/images/error.png'

const Account = ({ setClose, account, functionName }) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createAccount',
    args: [name]
  })
  const { write, error } = useContractWrite(config);
  return (
    <div>
    <div className="fixed top-[20%] left-[30%] px-4 py-3 z-[888888] bg-[#10100e] w-[500px] h-[300px]">
      <div onClick={() => setClose(false)} className="text-[#FFFFE3]">
        <AiOutlineCloseSquare />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
      <div className="my-5">
          <label htmlFor="text"  className="block text-lg text-black uppercase">
            Image
          </label>
          <input  type='text' onChange={(e) => setName(e.target.value)}  className="w-full border-2 border-[#333]  outline-none rounded-[5px] h-[50px] p-[5px]"/>
        </div>
        <div className="my-5">
          <label htmlFor="text" className="block text-lg uppercase">
            Image
          </label>
          <input
           id="acccountAddress"
            type="text"
            placeholder={address}
            onChange={(e) => setAccountAddress(e.target.value)}
            value={accountAddress}
            className="w-full border-2 border-[#333]  outline-none rounded-[5px] h-[50px] p-[5px]"
          />
        </div>
        <button
        disabled={!write}
        onClick={() => write?.(name, accountAddress)}
          type="submit"
          className="text-lg bg-[#FFFFE3] text-[#10100e] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
        >
          Create Account
        </button>
      </form>
    </div>
    {error && (
      <div className="bg-[#fafafa] w-[300px] py-9 px-6 left-[30%] top-[30%] fixed z-[9999999999] items-center justify-center">
        <Image src={errors} alt='error' className='w-[60px] h-[60px] items-center mx-auto mb-3 flex justify-center object-contain' />
        <div className='flex flex-col text-red-600 space-y-3 items-center  justify-center text-sm'>
          <span>OOPS!</span>
          <li>User Already Exist</li>
        </div>
      </div>
    )}
    </div>
  );
};

export default Account;
