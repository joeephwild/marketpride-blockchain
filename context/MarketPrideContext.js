import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { connectingWithSmartContract } from "../utils/apiFeature";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

export const MarketPrideContext = React.createContext();
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const MarketPrideProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [store, setStore] = useState([]);
  const router = useRouter();

  //Fetch data on page load
  const fetchData = async () => {};

  useEffect(() => {
    getConnectWallet();
    addWalletListener();
  }, [walletAddress]);

  //CONNECT WALLET
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(account[0]);
      } catch (error) {
        console.log("no network");
      }
    }
  };

  //add a wallet listener
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  //Connect wallet on page load
  const getConnectWallet = async () => {
    try {
      if (!ethereum) {
        console.warn("Ethereum not installed");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        console.log("No Accounts found");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //Create an Account
  const accountCreated = async (name, accountAddress) => {
    if (!name) {
      toast.custom("missing data");
      const contract = await connectingWithSmartContract();
      const getCreatedUser = await contract.createAccount(name);
      setAccount(getCreatedUser);
      alert(getCreatedUser);
    } else {
      toast.error("User Already Exist");
      console.log("User Already Exist");
    }
  };

  //Create a store
  const createAStore = async (formInput, fileUrl, router) => {
    const [name, description] = formInput;
    if (!name || !description || !fileUrl) {
      toast.custom("missing data");
      alert("data is missing");
      const datas = JSON.stringify({
        name,
        description,
        imageUrl: fileUrl,
        coverImage: fileUrl,
      });
      const contract = await connectingWithSmartContract();
      const getCreatedUser = await contract.createStore(
        name,
        desc,
        imageUrl,
        coverImage,
        id
      );
      setStore(getCreatedUser);
      alert(getCreatedUser);
      try {
        const added = await client.add(datas);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        return url;
      } catch (error) {
        alert("error while creating store upload");
      }
    } else {
      toast.error("User Already Exist");
      console.log("User Already Exist");
    }
  };

  //upload to ipfs
  const uploadToIpfs = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      alert("error while uploading");
    }
  };

  //List Products
  const ListProducts = async (
    seller,
    price,
    rating,
    name,
    description,
    category,
    imgUrl
  ) => {
    if (!name || !description || !price || !rating || !category || !imgUrl) {
      alert("Pls provide necessary details");
      const contract = await connectingWithSmartContract();
      const getListedProducts = await contract.listNewProduct(
        price,
        rating,
        name,
        description,
        category,
        imgUrl
      );
      setStore(getListedProducts);
      alert("products listed sucessfully");
      return {
        price,
        rating,
        name,
        description,
        category,
        imgUrl,
      };
    } else {
      alert("something went wrong");
    }
  };

  return (
    <MarketPrideContext.Provider
      value={{
        connectWallet,
        walletAddress,
        accountCreated,
        account,
        createAStore,
        connectingWithSmartContract,
        uploadToIpfs,
      }}
    >
      {children}
    </MarketPrideContext.Provider>
  );
};
