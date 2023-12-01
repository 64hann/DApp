
require("dotenv").config();
// const { ethers } = require("hardhat");
// const ethers = require("ethers");
// require("@nomiclabs/hardhat-ethers");

const USER_ADDRESS = process.env.USER_ADDRESS;

async function main() {
  // We get the contract to deploy
  const NFTicket = await ethers.getContractFactory("Nfticket");
  console.log("Deploying nfticket...");
  const nft_ticket = await NFTicket.deploy(
    // can change this to your own address to make yourself the owner
    USER_ADDRESS
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
