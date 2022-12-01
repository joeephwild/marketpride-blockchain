import Image from "next/image";
import React, { useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { MarketPrideContext} from '../context/MarketPrideContext'
import { BiUpload } from "react-icons/bi";

const DropZone = ({ title, }) => {
    const { uploadToIpfs, setCoverImage, setImage } = useContext(MarketPrideContext)
    const [fileUrl, setFileUrl] = useState(null);
    const onDrop = useCallback(async (acceptedFile) => {
      const url = await uploadToIpfs(acceptedFile[4]);
      setFileUrl(url);
      setCoverImage(url);
      setImage(url);
    });
    console.log(fileUrl)

  const { getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
    
  });
  
  
  
  return (
    <div className="bg-white text-black max-h-fit w-full ">
    <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      <span>Upload a {title}</span>
      <p className='text-5xl flex justify-center items-center text-center'><BiUpload  /></p>
    </div>
      <aside>
        <h4>Files</h4>
        <ul>{fileUrl && (
         <div>
          <Image src={fileUrl} className='h-7 w-7' alt="image" width={20} height={20} />
          { fileUrl}
         </div>
        )}</ul>
      </aside>
    </section>
    </div>
  );
};

export default DropZone;
