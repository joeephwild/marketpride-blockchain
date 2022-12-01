import React, { useState, useEffect, createContext, useRef } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { connectingWithSmartContract } from "../utils/apiFeature";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
export const MarketPrideContext = React.createContext();
//ipfs configuration
const subdomain = "https://ipfs.io/api/v0";
const INFURA_ID = "2IBwaq8gyu2aOFDFSRUPMSR8cvK";
const INFURA_SECRET_KEY = "b412376181ed1cf360898eaed01e2f8c";
const auth =
  "Basic " +
  Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");
const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const MarketPrideProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [store, setStore] = useState([]);
  const [ifUserExist, setIfUserExist] = useState(false);
  const [ifStoreUserExist, setIfStoreUserExist] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  //const [currentUserName, setCurrentUserName] = useState(null);
  const [userName, setUserName] = useState("");
  const [userStore, setUserStore] = useState([]);
  const [product, setProduct] = useState([]);
  const [singleStore, setSingle] = useState({});
  //const [coverImage, setCoverImage] = useState('');
  const router = useRouter();

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) return;
    console.log("Should load only once");
    getConnectWallet();
    addWalletListener();
    fetchData();
  }, []);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
  }, []);

  //Fetch data on page load
  const fetchData = async () => {
    try {
      //check if user exist
      setIfUserExist(doesUserExist);
      //get all user stores and products
      setUserStore(fetchAllUserStoreAndProducts);
      //get if store exist
      setIfStoreUserExist(doesStoreExist);
      //fetch all stores
      setStore(fetchAllStores);
      //fetch all products
      setProduct(fetchAllProducts);
      //getusername
      setUserName(getUsername);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  //fetch user store
  const fetchAllStores = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const stores = await contract.getAllStore();
      console.log(stores);
      return stores;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUserStoreAndProducts = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const allStore = await contract.getAllUserStoreAndProducts(
        currentAccount
      );
      return allStore;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const products = await contract.getAllProduct();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  const doesUserExist = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const ifExist = await contract.checkUserExists(currentAccount);
      return ifExist;
    } catch (error) {
      console.log(error);
    }
  };

  const doesStoreExist = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const storeExist = await contract.getIfStoreExist();
      return storeExist;
    } catch (error) {
      console.log(error);
    }
  };

  //add a wallet listener
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setCurrentAccount("");
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
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Accounts found");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(account[0]);
      } catch (error) {
        console.log("no network");
      }
    }
  };
  /* */

  const getUsername = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const getCreatedUsername = await contract.getUsername(currentAccount);
      console.log(getCreatedUsername);
      return getCreatedUsername;
    } catch (error) {
      console.log(error);
      setError("Error while creating your store Please reload browser");
    }
  };

  //Create an Account
  const accountCreated = async (name, accountAddress) => {
    try {
      // if (name || accountAddress)
      //   return setError("Name And AccountAddress, cannot be emty");

      const contract = await connectingWithSmartContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
      setCurrentUserName(getCreatedUser);
    } catch (error) {
      setError("Error while creating your account Please reload browser");
    }
  };

  const createAStore = async (name, description, imageUrl, coverImage) => {
    try {
      const contract = await connectingWithSmartContract();
      const createStores = await contract.createStore(
        name,
        description,
        imageUrl,
        coverImage
      );
      router.push("/listproducts");
      return createStores;
    } catch (error) {
      console.log(error);
      setError("Error while creating your store Please reload browser");
    }
  };

  /*const uploadToIpfs = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
    }
  };*/

  //List Products
  const listProducts = async (
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
        seller,
        price,
        rating,
        name,
        description,
        category,
        imgUrl
      );
      alert("products listed sucessfully");
      return getListedProducts;
    } else {
      alert("something went wrong while listing products");
    }
  };

  //upload to ipfs

  return (
    <MarketPrideContext.Provider
      value={{
        walletAddress,
        accountCreated,
        account,
        createAStore,
        //uploadToIpfs,
        currentAccount,
        connectWallet,
        userName,
        listProducts,
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
