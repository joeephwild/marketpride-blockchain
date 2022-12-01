import React, { useState } from "react";
import { MarketPrideContext } from "../context/MarketPrideContext";
import Navbar from "../components/Navbar";
import { Uploader } from "uploader";
import {  useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";

const createStore = () => {
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const { address} = useAccount()
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
          setCoverImage(files[0].fileUrl);
          setImage(files[0].fileUrl);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createStore',
    args: [name, desc, image, coverImage]
  })
  const { write } = useContractWrite(config)
  return (
    <div className="w-screen h-screen  overflow-x-hidden">
      <Navbar />
      <div className="my-16">
        <section className="bg-[#10100e] shadow-lg shadow-gray-400 text-white w-[500px] mx-auto px-4 py-[6px]  mt-8">
          <span className="text-center flex justify-center mt-6 items-center text-4xl font-bold text-white">
            Create Store
          </span>
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center justify-center space-x-3">
              <div className="flex flex-col items-center my-5">
                <button
                  className="bg-[#FFFFE3] px-8 py-4 rounded-lg text-[#10100e]"
                  onClick={handleUploadProductImage}
                >
                  Upload Image
                </button>
              </div>
              <div className="flex flex-col items-center my-5">
                <button
                  className="bg-[#FFFFE3] px-8 py-4 rounded-lg text-[#10100e]"
                  onClick={handleUploadProductImage}
                >
                  Upload coverImage
                </button>
              </div>
            </div>

            <div className="my-5">
              <label htmlFor="text" className="block text-lg uppercase">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="...Store Name"
                className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
              />
            </div>

            <div className="my-5">
              <label htmlFor="text" className="block text-lg uppercase">
                Description
              </label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                placeholder="...Description of Store"
                className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
              />
            </div>
            <button
            disabled={!write}
              onClick={async () => write?.(name, desc, image, coverImage)}
              type="submit"
              className="bg-[#FFFFE3] shadow-lg  shadow-gray-400 text-[#10100e] px-6 py-3.5 rounded-lg"
            >
              Create
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default createStore;
