/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
// require('/.env').config()

const PRIVATE_KEY = 'USE YOUR PRIVATE KEY HERE'

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ZJxoD3Na-6bb1-ZjWP6A5tuZHmF-W1cu",
      accounts: 
        [`0x${PRIVATE_KEY}`],
    },
  },
};
