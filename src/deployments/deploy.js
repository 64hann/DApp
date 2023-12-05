
// const { MAX_SUPPLY, MINT_PRICE } = require("../constants/constants");  



require("dotenv").config();
// const { ethers } = require("hardhat");
// const ethers = require("ethers");
// require("@nomiclabs/hardhat-ethers");
const maxSupply = 50;
const mintPrice = "50000000000000000"
const USER_ADDRESS = process.env.USER_ADDRESS;

async function main() {
  // We get the contract to deploy
  const NFTicket = await ethers.getContractFactory("Nfticket");
  console.log("Deploying nfticket...");
  const nft_ticket = await NFTicket.deploy(
    // can change this to your own address to make yourself the owner
    USER_ADDRESS,
    maxSupply,
    mintPrice
  );
  await nft_ticket.deployed();
  console.log("NFTicket deployed to:", nft_ticket.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
