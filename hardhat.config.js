/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();


const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_URL = process.env.API_URL


module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: 
        [`0x${PRIVATE_KEY}`],
    },
  },
};
