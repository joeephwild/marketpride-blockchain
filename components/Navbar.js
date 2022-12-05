import React, { useState, useContext, useEffect } from "react";
import logo from "../public/images/favicon.svg";
import avatar from "../public/images/avatar.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { MarketPrideContext } from "../context/MarketPrideContext";
import NavMenu from "./NavMenu";
import Account from "./Account";
import Link from "next/link";
import { Web3Button } from "@web3modal/react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";
import { ethers } from "ethers";

const Navbar = () => {
  const [name, setName] = useState("");
  const { createAnAccount } = useContext(MarketPrideContext);
  const [openNav, setOpenNav] = useState(false);
  const [modal, setModa] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(1);
  const { address } = useAccount();
  const menuItems = [
    {
      menu: "Home",
      links: "/",
    },
    {
      menu: "My store",
      links: "/mystore",
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
  return ( 
    <div className="fixed mb-9 w-full">
      <nav className=" bg-[#FFFFE3] cursor-pointer flex items-center justify-between py-2 px-2.5">
        {/* Menu Links */}
        <div className="xl:flex items-center  text-sm font-bold space-x-4 hidden">
          {menuItems.map((link, i) => (
            <ul onClick={() => setActive(i + 1)} key={i + 1}>
              <Link href={link.links}
                className={`${
                  active == i + 1 ? "border-b-4 border-[#10100e] p-2" : ""
                }`}
              >
                {link.menu}
              </Link>
            </ul>
          ))}
        </div>
        {/* Logo Section */}
        <div className="flex items-center justify-center xl:mr-9 space-x-2">
          <Image src={logo} width={30} height={30} alt="logo" />
          <div className="flex items-center text-lg lg:text-2xl font-ClashDisplay-Regular">
            <span>MarketPride</span>
          </div>
        </div>
        <div>
          <div className="text-[8px] hidden  lg:flex items-center space-x-3">
            <button
              onClick={() => setOpen(true)}
              className="text-sm bg-[#10100e] text-[#FFFFE3] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
            >
              Create Account
            </button>
            <Link href="/create">
              <button className="text-sm bg-[#10100e] text-[#FFFFE3] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300">
                <small>List Product</small>
              </button>
            </Link>
            <Link href="/createStore">
              <button className="text-sm bg-[#10100e] text-[#FFFFE3] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300">
                <small>Create Store</small>
              </button>
            </Link>
            <div className="text-[6px]">
              <Web3Button />
            </div>
          </div>
        </div>
        <div onClick={() => setOpenNav(true)} className=" xl:hidden block">
          <AiOutlineMenu size={24} />
        </div>
      </nav>

      {openNav && <NavMenu setOpen={setOpenNav} setOpenN={setOpen} />}

      {open ? (
        <Account setClose={setOpen}  />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
