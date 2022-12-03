import React, { useState, useEffect, createContext, useRef } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi'
import { useRouter } from "next/router";
import { contractAbi, contractAddress } from "./constant";
import { Web3Modal } from "web3modal";
import { ethers, providers } from "ethers";

export const MarketPrideContext = React.createContext();


export const MarketPrideProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [store, setStore] = useState({});
  const [ifUserExist, setIfUserExist] = useState(false);
  const [ifStoreUserExist, setIfStoreUserExist] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [userStore, setUserStore] = useState();
  const [product, setProduct] = useState([]);
  const [singleStore, setSingle] = useState({});
  const {address} = useAccount();
 
  

  return (
    <MarketPrideContext.Provider
      value={{
      }}
    >
      {children}
    </MarketPrideContext.Provider>
  );
};
//how to format a price in ethersjs?
/* const tx = {
  to: toAddress,
  value: ethers.utils.parseEther(value),
  gasLimit: 50000,
  nonce: nonce || undefined,
};
await signer.sendTransaction(tx);


const tx = await contract.safeTransferFrom(from, to, tokenId, amount, [], {
  gasLimit: 100000,
  nonce: nonce || undefined,
}); */
