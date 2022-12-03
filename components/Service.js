import Image from "next/image";
import React from "react";

const Service = ({ image, title, text }) => {
  return (
    <div>
      <div className="flex bg-[#10100e] text-[#fffffe] max-h-[300px] mx-6 rounded-lg px-4 flex-col my-6 items-start md:items-center space-y-3">
        <Image
          className="hover:scale-125 animate-bounce transition-all ease-in-out"
          src={image}
          width={80}
          height={80}
          alt="image"
        />
        <div className="py-2 flex flex-col items-center">
          <span className="text-lg font-bold">{title}</span>
          <span className="text-sm mb-4">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Service;
