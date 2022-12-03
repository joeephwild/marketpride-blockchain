import { TASK_COMPILE_SOLIDITY_LOG_NOTHING_TO_COMPILE } from 'hardhat/builtin-tasks/task-names'
import React, { useEffect, useState } from 'react'
import { useAccount, useContract, useContractRead, useContractReads, useProvider } from 'wagmi'
import { contractAbi, contractAddress } from '../context/constant'
import Banner from './Banner'
import axios from 'axios'
import { ethers } from 'ethers'
import StoreCard from './StoreCard'

const Stores = () => {
   const {address} = useAccount();
   const [store, setStore] = useState([])

const getStores = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractAbi, provider)
    const  getStore = await contract.getAllStore()
    console.log(address);
    setStore(getStore)
    } catch (error) {
       console.log(error) 
    }
    
}
    useEffect(() => {
        getStores();
    })
  return (
    <div className='col-span-6 '>
        <div className='flex space-x-9 items-center justify-center'>
        </div>
        <div className='w-full grid grid-cols-4'>
            {store.map((items, i) => (
               <StoreCard key={i} item={items} />
            ))}
        </div>
    </div>
  )
}

export default Stores