import React, { useState, useContext } from 'react'
import { MarketPrideContext } from "../context/MarketPrideContext";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Navbar from '../components/Navbar';
import DropZone from '../components/DropZone';

const createStore = () => {
  const { createAStore, coverImage, image, uploadToIpfs, uploadAStore } = useContext(MarketPrideContext);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  //const [image, setImage] = useState(null);
  //const [coverImage, setCoverImage] = useState(null);
  //const [account, setAccount] = useState("");
  console.log(image)
  console.log(coverImage)


  return (
    <div className='w-screen h-screen  overflow-x-hidden'>
      <Navbar />
      <div className='my-16'>
       <section className="bg-[#10100e] shadow-lg shadow-gray-400 text-white w-[500px] mx-auto px-4 py-[6px]  mt-8">
        <span className="text-center flex justify-center mt-6 items-center text-4xl font-bold text-white">
         Create Store
        </span>
          <form className='' onSubmit={(e) => {e.preventDefault();
          uploadToIpfs();}}>
            <div className="my-5">
            <label htmlFor="text" className="block text-lg uppercase">
                Name
              </label>
             <DropZone title='Profile Image' />
            </div>
            <div className="my-5">
            <label htmlFor="text" className="block text-lg uppercase">
                Name
              </label>
              <DropZone title='Cover Image' />
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
            onClick={async() => createAStore(name, desc, image, coverImage)}
              type="submit"
              className="bg-[#FFFFE3] shadow-lg  shadow-gray-400 text-[#10100e] px-6 py-3.5 rounded-lg"
            >
              Create
            </button>
          </form>
      </section>
      </div>
    </div>
  )
}

export default createStore