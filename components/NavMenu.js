import React from "react";
import avatar from "../public/images/avatar.png";
import Image from "next/image";
import { AiFillShopping, AiOutlineClose } from "react-icons/ai";
import { Web3Button } from "@web3modal/react";
import Link from "next/link";

const NavMenu = ({ setOpen, address, setOpenN }) => {
  const menuItems = [
    {
      menu: "Home",
      links: "/",
    },
    {
      menu: "My stores",
      links: "/",
    },
    {
      menu: "products",
      links: "/products",
    },
    {
      menu: "Stores",
      links: "/allstores",
    },
    {
      menu: "Faq",
      links: "/",
    },
  ];

  const handleClick = () => {
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
          <Link
            href={links.links}
            className="text-[#FFFFE3] cursor-pointer hover:border-b-4 hover:p-3 hover:border-[#FFFFE3] text-lg list-none"
            key={i}
          >
            {links.menu}
          </Link>
        ))}
        <div className="flex flex-col items-center space-y-2.5 text-[10px]">
          <div>
            <div className="flex space-x-3 items-center">
              <button
                onClick={() =>
                  setOpenN(true)}
                className="text-lg bg-[#FFFFE3] text-[#10100e] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
              >
                <small>Create Account</small>
              </button>
              <Link href="/listproducts">
                <button className="text-lg bg-[#FFFFE3] text-[#10100e] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300">
                  <small>List product</small>
                </button>
              </Link>
            </div>
            <div className="text-[6px] flex space-x-3 justify-center mt-5 items-center">
              <Web3Button />
              <Link href='/createStore'>
                <button className="text-lg bg-[#FFFFE3] text-[#10100e] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300">
                  <small>Create Store</small>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
