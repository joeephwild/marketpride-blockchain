import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./constant";
import { toast } from "react-hot-toast";

export const MarketPrideContext = React.createContext();

const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};


export const MarketPrideProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        //console.log(accounts[0]);
      } catch (err) {
       setError('Error with connection')
      }
    } else {
      /* MetaMask is not installed */
      setError("Please install MetaMask");
    }
  }
 

  const accountCreate = async ({name, accountAddress}) => {
    try {
        //connect to contract
        const marketPrideContract = await connectingWithContract();
        const getCreatedUser = await marketPrideContract.createAccount(name);
        console.log(name);
        setLoading(true);
        await getCreatedUser.wait();
        setLoading(false);
        window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MarketPrideContext.Provider
      value={{
        connectWallet,
        walletAddress
      }}
    >
      {children}
    </MarketPrideContext.Provider>
  );
};
