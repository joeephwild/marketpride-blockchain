import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import Navbar from '../components/Navbar';
import { contractAbi, contractAddress } from "../context/constant";

const mystore = () => {
    const [userStore, setUserStore] = useState([]);
    const {address} = useAccount()
    console.log(userStore)
    const fetchUserDetails = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            provider
          );
          const getUserStore = await contract.getAllUserStoreAndProducts(address);
          setUserStore(getUserStore);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        fetchUserDetails();
      }, []);
  return (
    <div>
        <Navbar />
    </div>
  )
}

export default mystore