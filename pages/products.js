import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Categories";
import { contractAbi, contractAddress } from "../context/constant";
import { useAccount } from "wagmi";

const products = () => {
  const { address } = useAccount()
  const [products, setProducts] = useState([]);
  console.log(products)
  const getStores = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      const fetchProduct = await contract.getAllProduct();
      setProducts(fetchProduct);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getStores();
  }, [address]);

  return (
    <div>
      <Navbar />
      <div className=" max-h-screen overflow-hidden lg:max-w-6xl">
        <div className="hidden sm:flex  items-center rounded-md justify-center h-26 cursor-pointer">
          <input
            type="text"
            className="p-2 border-2 border-[#10100e] h-full w-[60%]  rounded-l-md focus:outline-none px-4"
          />
          <FaSearch className="h-fit w-fit bg-[#10100E] text-white p-4" />
        </div>
        <div className="grid-cols-9 grid">
          <span className="col-span-2">
            <Categories />
          </span>
          <span className="lg:col-span-7 col-span-9 grid lg:grid-cols-4 grid-cols-2 gap-3">
            {products.map((item, i) => (
                <div  className='4'>
                      <ProductCard key={i + 1} product={item}/>
                </div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default products;
