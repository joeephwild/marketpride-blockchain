import React from 'react'
import Navbar from '../components/Navbar';
import DropZone from '../components/DropZone';

const listproducts = () => {
  return (
    <div>
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
           // onClick={async() => createAStore()}
              type="submit"
              className="bg-[#FFFFE3] shadow-lg  shadow-gray-400 text-[#10100e] px-6 py-3.5 rounded-lg"
            >
              Create
            </button>
          </form>
      </section>
      </div>
    </div>
    </div>
  )
}

export default listproducts