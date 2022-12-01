import React, { useContext, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";

const Account = ({ setClose, account, functionName }) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createAccount',
    args: [name]
  })
  const { write } = useContractWrite(config)
  console.log(config)
  return (
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
            placeholder={account || "Enter address.."}
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
  );
};

export default Account;
