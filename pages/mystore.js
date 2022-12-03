import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import Navbar from '../components/Navbar';
import UserStoreCard from '../components/UserStoreCard';
import { contractAbi, contractAddress } from "../context/constant";

const mystore = () => {
    const [userStore, setUserStore] = useState([]);
    const [userProduct, setUserProduct] = useState([])
    console.log(userProduct)
    const {address} = useAccount()
    const fetchUserDetails = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            provider
          );
          const getUserStore = await contract.fetchSellerStore(address);
          const getUserProduct = await contract.fetchSellerProducts(address);
          setUserProduct(getUserProduct)
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
        <div>
          {userStore.map((list, i) => (
              <UserStoreCard key={i} item={list} />
          ))}
        </div>
    </div>
  )
}

export default mystore