import { ethers } from "ethers";
import { id } from "ethers/lib/utils.js";
import Image from "next/image";
import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";
import matic from "../public/images/matic.webp";
import { formatNumber } from "../utils/apiFeature";

const ProductCard = ({ product }) => {
    const {address} = useAccount()
    const { config, error } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'payForProducts',
        overrides: {
            from: address,
            value: parseInt(product.price).toString(),
            
          },
          args: [product.id]
      })
      const { write } = useContractWrite(config);
      
      function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
  return (
    <div className="cols-span-6 cursor-pointer mt-5">
      <div className="md:max-w-[250px] max-w-[150px] h-[400px] mx-auto rounded-lg bg-[#10100e] container">
        <img src={product.imgUrl} className="h-52 w-full overflow-hidden object-fit lg:object-cover" />
        <div className="flex items-center w-fit  py-2 px-1.5 text-[#fffffe] flex-col space-y-2">
          <span className="text-xs font-bold">{truncate(product.name, 19)}</span>
          <span className='text-[#fffffe] text-sm'>{product.seller.slice(1,9)}...{product.seller.slice(38, 49)}</span>
          <span className="text-xs text-wrap ">{truncate(product.description, 29)}</span>
          <div className="flex items-center px-3 justify-between w-full">
            <div className="flex items-center space-x-2">
              <strong className='text-xs'>{((product.price / 10 ** 5) * 50).toFixed(3)}</strong>{" "}
              <Image src={matic} className="h-5 w-5 object-contain" />
            </div>
            <button onClick={() => write?.()} className='bg-[#fffffe] text-sm text-[#10100e] px-2.5 py-1 rounded-lg'>Buy</button>
          </div>
          <button className="bg-[#fffffe] text-sm  flex justify-center w-full mb-3 text-[#10100e] px-4.5 py-2.5 rounded-lg">Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
