import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { Uploader } from "uploader";
import { MarketPrideContext } from "../context/MarketPrideContext";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { formatNumber } from "../utils/apiFeature";

const listproducts = () => {
  const { listProducts } = useContext(MarketPrideContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  console.log(imgUrl);

  const uploader = new Uploader({
    apiKey: "public_kW15az78y4qQXTs4kwHVN73cEhoR",
  });

  const handleUploadProductImage = async () => {
    uploader
      .open({ multi: false })
      .then((files) => {
        if (files.length === 0) {
          alert("No files selected.");
        } else {
          setImgUrl(files[0].fileUrl);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const prices = parseInt(price).toString()
  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "listNewProduct",
    args: [parseInt(price).toString(), rating, name, description, category, imgUrl],
  });
  const { write } = useContractWrite(config);
  return (
    <div>
      <div className="w-screen h-screen  overflow-x-hidden">
        <Navbar />
        <div className="my-9">
          <section className="bg-[#10100e] my-6 shadow-sm shadow-gray-400 text-white w-[400px] lg:w-[500px] mx-auto px-4 py-[6px]  mt-8">
            <span className="text-center flex justify-center mt-6 items-center text-4xl font-bold text-white">
              List Products
            </span>
            <form className="" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col items-center my-5">
                <span className="text-3xl font-bold mb-3">Image</span>
                <button
                  className="bg-[#FFFFE3] px-8 py-4 rounded-sm text-[#10100e]"
                  onClick={handleUploadProductImage}
                >
                  Upload Product image
                </button>
              </div>
              <div className="flex space-x-3 items-center">
                <div className="my-5">
                  <label htmlFor="text" className="block text-sm uppercase">
                    Product Image
                  </label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    step="0.01"
                    placeholder="Amount(ETH)"
                    className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="text" className="block text-sm uppercase">
                    Product Image
                  </label>
                  <input
                    onChange={(e) => setRating(e.target.value)}
                    type="text"
                    placeholder="...Enter Rating"
                    className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
                  />
                </div>
              </div>
              <div className="my-5">
                <label htmlFor="text" className="block text-sm uppercase">
                  Product Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="...Products Name"
                  className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
                />
              </div>
              <div className="my-5">
                <label htmlFor="text" className="block text-sm uppercase">
                  Product Image
                </label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="...Add a description"
                  className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
                />
              </div>
              <div className="my-5">
                <label htmlFor="text" className="block text-sm uppercase">
                  Categories
                </label>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  placeholder="...categories"
                  className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
                />
              </div>
              <button
              disabled={!write}
                onClick={async () =>
                  write?.(
                    price,
                    rating,
                    name,
                    description,
                    category,
                    imgUrl
                  )
                }
                type="submit"
                className="bg-[#FFFFE3] shadow-sm  shadow-gray-400 text-[#10100e] px-6 py-3.5 rounded-sm"
              >
                Create
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default listproducts;