require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

const  ALCHEMY_API_URL = process.env. ALCHEMY_API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "matic",
  networks: {
    hardhat:{},
    matic: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
};
