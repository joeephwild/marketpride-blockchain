import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractAbi, contractAddress } from "../context/constant";

export const formatNumber = value => {
    return Number(value).toLocaleString()
  }

  const fetchContract = (signerOrProvider) =>
  new ethers.Contract(contractAddress, contractAbi, signerOrProvider);

export const connectingWithSmartContract = async () => {
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

//---CONNECTING WITH SMART CONTRACT
/*const fetchContract = (signerOrProvider) =>
  new ethers.Contract(contractAddress, contractAbi, signerOrProvider )

export const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};*/
  
