import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { contractAbi, contractAddress } from '../context/constant'

export const formatNumber = value => {
    return Number(value).toLocaleString()
  }