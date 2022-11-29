import React, { useState, useContext } from 'react'
import { MarketPrideContext } from "../context/MarketPrideContext";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Navbar from '../components/Navbar';

const createStore = () => {
  const { createAStore, walletAddress, address } = useContext(MarketPrideContext);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [account, setAccount] = useState("");


  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <Navbar />
       <section className="bg-[#10100e] shadow-lg shadow-gray-400 text-white w-[500px] mx-auto px-4 py-[6px]  mt-8">
        <span className="text-center flex justify-center mt-6 items-center text-4xl font-bold text-white">
         Create Store
        </span>
          <form className='' onSubmit={(e) => e.preventDefault()}>
            <div className="my-5">
              <label htmlFor="text" className="block text-lg uppercase">
                Cover Image
              </label>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                type="file"
                placeholder={address}
                className="w-full border-2 border-[#333]  outline-none rounded-[5px] h-[50px] p-[5px]"
              />
            </div>
            <div className="my-5">
              <label htmlFor="text" className="block text-lg uppercase">
                Image
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                type="file"
                placeholder={address}
                className="w-full border-2 border-[#333]  outline-none rounded-[5px] h-[50px] p-[5px]"
              />
            </div>
            <div className="my-5">
              <label htmlFor="text" className="block text-lg uppercase">
                Name
              </label>
              <input
                value={name}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                placeholder="...Description of Store"
                className="w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]"
              />
            </div>
            <button
            onClick={() => createAStore(name, desc,image, coverImage)}
              type="submit"
              className="bg-[#FFFFE3] shadow-lg  shadow-gray-400 text-[#10100e] px-6 py-3.5 rounded-lg"
            >
              Create
            </button>
          </form>
      </section>
    </div>
  )
}

export default createStore