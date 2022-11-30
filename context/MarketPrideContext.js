import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { connectingWithSmartContract } from "../utils/apiFeature";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

export const MarketPrideContext = React.createContext();
//ipfs configuration 
const subdomain = "https://ipfs.infura.io:5001/api/v0"
const INFURA_ID ="2IBwaq8gyu2aOFDFSRUPMSR8cvK"
const INFURA_SECRET_KEY ="b412376181ed1cf360898eaed01e2f8c"
const auth =
    'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
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
  const [ifUserExist, setIfUserExist] = useState(false)
  const [ifStoreUserExist, setIfStoreUserExist] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUserName, setCurrentUserName] = useState('')
  const [userStore, setUserStore] = useState({});
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const router = useRouter();

  //Fetch data on page load
  const fetchData = async () => {
    try {
       //GET CONTRACT
    const contract = await connectingWithSmartContract();
    //GET ACCOUNT
    
    //GET USER NAME
    const user = await contract.getUsername(currentAccount);
    setCurrentUserName(user);
    //check if user exist
    const ifExist = await contract.checkUserExists(currentAccount);
    setIfUserExist(ifExist);
    //get all user stores
    const allStore = await contract.getAllUserStoreAndProducts(currentAccount);
    setUserStore(allStore);
    //get if store exist
    const storeExist = await contract.getIfStoreExist();
    setIfStoreUserExist(storeExist);
    //fetch all stores
    const stores = await contract.getAllStore();
    setStore(stores);
    //fetch all products
    const products = await contract.getAllProduct();
     setProduct(products);
    } catch (error) {
      alert('error from useEffect')
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectWallet();
    addWalletListener();
    //fetchData();
  }, []);

  //CONNECT WALLET
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
    } catch (error) {
      setError("Error while creating your account Please reload browser");
    }
  };

  const createAStore = async (name, description, imageUrl, coverImage) => {
    if (!name || !description || !imageUrl || !coverImage) {
      alert("hey fill details up");
      try {
        // if (name || accountAddress)
        //   return setError("Name And AccountAddress, cannot be emty");
  
        const contract = await connectingWithSmartContract();
        const getCreatedStore = await contract.createStore(name);
        setLoading(true);
        await getCreatedStore.wait();
        setLoading(false);
        window.location.reload();
        router.push('/listproducts')
      } catch (error) {
        setError("Error while creating your store Please reload browser");
      }
    } else {
      alert("hey comeon");
    }
  };
  /**/

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

  //upload to ipfs
  const uploadToIpfs = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.infura.io:5001/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
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
        uploadToIpfs,
        currentAccount,
        coverImage,
        setCoverImage,
        image,
        setImage,
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


