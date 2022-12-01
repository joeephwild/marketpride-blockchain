import React, { useState, useContext } from "react";
import logo from "../public/images/favicon.svg";
import avatar from "../public/images/avatar.png";
import Image from "next/image";
import { AiOutlineMenu} from "react-icons/ai";
import { MarketPrideContext } from "../context/MarketPrideContext";
import NavMenu from "./NavMenu";
import Account from "./Account";
import Link from "next/link";
import { Web3Button } from "@web3modal/react";
import { useAccount, useContractRead } from "wagmi";
import { contractAbi, contractAddress } from "../context/constant";

const Navbar = () => {
  const { createAnAccount } =
    useContext(MarketPrideContext);
  const [openNav, setOpenNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(1);
  const { address} = useAccount()
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

  const name = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getUsername',
    args: [address]
  });
  return (
    <div>
      <nav className="w-lg  cursor-pointer flex items-center justify-between py-2 px-2.5">
        {/* Menu Links */}
        <div className="xl:flex items-center  text-sm font-bold space-x-4 hidden">
          {menuItems.map((link, i) => (
            <ul onClick={() => setActive(i + 1)} key={i + 1}>
              <li
                className={`${
                  active == i + 1 ? "border-b-4 border-[#10100e] p-2" : ""
                }`}
              >
                {link.menu}
              </li>
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
              <div>
                <button
                  onClick={() => setOpen(true)}
                  className="text-sm bg-[#10100e] text-[#FFFFE3] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
                >
                  <small>{name ? name.data : "Create account"}</small>
                </button>
              </div>
              <div>
                <Link href="/createStore">
                <button
                  className="text-sm bg-[#10100e] text-[#FFFFE3] px-3 py-2 rounded-lg hover:shadow-sm hover:shadow-gray-300"
                >
                  <small>Name</small>
                </button>
                </Link>
              </div>
              <div className="text-[6px]">
              <Web3Button />
              </div>

          </div>
        </div>
        <div onClick={() => setOpenNav(true)} className=" xl:hidden block">
          <AiOutlineMenu size={24} />
        </div>
      </nav>


      {openNav && <NavMenu setOpen={setOpenNav} setModal={setOpenModal} />}

      {open ? (
        <Account
          setClose={setOpen}
          functionName={createAnAccount}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
