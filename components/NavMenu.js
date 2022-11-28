import React from "react";
import avatar from "../public/images/avatar.png";
import Image from "next/image";
import { AiFillShopping, AiOutlineClose } from "react-icons/ai";

const NavMenu = ({ setOpen, address, setModal }) => {
  const menuItems = [
    {
      menu: "Home",
      links: "/",
    },
    {
      menu: "Shop",
      links: "/",
    },
    {
      menu: "Top Sellers",
      links: "/",
    },
    {
      menu: "Manage Store",
      links: "/",
    },
    {
      menu: "Faq",
      links: "/",
    },
  ];

  const handleClick = () => {
    setModal(true);
    setOpen(false);
  };
  return (
    <div className="fixed top-0 z-[999999] right-0 h-screen w-[300px] bg-[#10100e] items-center">
      <AiOutlineClose
        onClick={() => setOpen(false)}
        className="text-[#FFFFE3] text-end"
        size={28}
      />
      <div className="flex flex-col justify-center mt-6 space-y-8 items-center">
        {menuItems.map((links, i) => (
          <li
            className="text-[#FFFFE3] cursor-pointer hover:border-b-4 hover:p-3 hover:border-[#FFFFE3] text-lg list-none"
            key={i}
          >
            {links.menu}
          </li>
        ))}
        <div className="flex flex-col items-center space-y-2.5 text-[10px]">

          <div>
            <div className="flex space-x-3 items-center">
              <button
                onClick={handleClick}
                className="text-lg bg-[#FFFFE3] text-[#10100e] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
              >
                <small>Create Store</small>
              </button>
              <button
                className="text-lg bg-[#FFFFE3] text-[#10100e] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
              >
                <small>List product</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
