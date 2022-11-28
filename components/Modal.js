import Image from 'next/image';
import React, { useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'


const Modal = ({title, button, address, close}) => {
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [account, setAccount] = useState('');

  console.log(image)
      console.log(price)
  return (
    <div>
      <section className='bg-[#10100e] w-screen text-white h-screen sm:w-[500px] md:top-0 md:left-[30%] fixed px-[10px] py-[6px] z-[777777] mt-8'>
        <AiOutlineCloseSquare onClick={() => close(false)} />
        <span className='text-center flex justify-center mt-6 items-center text-4xl font-bold text-white'>{title}</span>
        <form >
        <div className='my-5'>
                      <label htmlFor='text' className='block text-lg uppercase'>Image</label>
                      <input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                       type="file"
                      placeholder={address}
                      className='w-full border-2 border-[#333]  outline-none rounded-[5px] h-[50px] p-[5px]' />
                  </div>
        <div className='my-5'>
                      <label htmlFor='text' className='block text-lg uppercase'>Name</label>
                      <input
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                       type="text"
                      placeholder="...Product Name"
                      className='w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]' />
                  </div>
                  <div className='my-5'>
                      <label htmlFor='text' className='block text-lg uppercase'>Account</label>
                      <input
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                       type="text"
                      placeholder='Enter address'
                      className='w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]' />
                  </div>
                  <div className='my-5'>
                      <label htmlFor='text' className='block text-lg uppercase'>Description</label>
                      <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                       type="text"
                      placeholder='...Description of products'
                      className='w-full border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]' />
                  </div>
                  <div className='my-5'>
                      <label htmlFor='text' className='block text-lg uppercase'>Account</label>
                      <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                       type="text"
                      placeholder='...Price'
                      className='w-[50%] border-2 text-black border-[#333] outline-none rounded-[5px] h-[50px] p-[5px]' />
                  </div>
                  <button type='submit' className='bg-[#FFFFE3] shadow-lg  shadow-gray-400 text-[#10100e] px-6 py-3.5 rounded-lg'>{button}</button>
        </form>
      </section>
    </div>
  )
}

export default Modal