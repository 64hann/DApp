require("dotenv").config();
// const API_URL = process.env.API_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const API_URL = process.env.API_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const contract = require("../artifacts/contracts/Nfticket.sol/Nfticket.json");
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CID = process.env.CID;

//  import the ABI

// console.log(JSON.stringify(contract.abi));

// create an instance of contract to interact with it

// const { ethers } = require("hardhat");
const ethers = require("ethers");
// const { listOfContracts } = require("../pages/EventDetails");
// console.log(PRIVATE_KEY);
// console.log(API_URL);
// const constants = require("../constants/constants.js");
// const CONTRACT_ADDRESS_0 = constants.CONTRACT_ADDRESS_0;
// const CONTRACT_ADDRESS_1 = constants.CONTRACT_ADDRESS_1;
//Provider - node provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// const { ethereum } = window;
// const provider = new ethers.providers.Web3Provider(ethereum);
// const signer = provider.getSigner();

//Signer -> eth account that signs the txn
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//Contract -> deployed contact
// const nft_contract = new ethers.Contract(
//   CONTRACT_ADDRESS,
//   contract.abi,
//   signer
// );
const nft_contract = new ethers.Contract(
  "0x36d21481403f11d0b70a2fda6fb6a30c9363f8cf",
  contract.abi,
  signer
);
// Call functions inside nftcontract
async function main() {
  // var isMintEnabled = await nft_contract.isMintEnabled()
  // console.log(`IsMintEnabled: ${isMintEnabled}`);
  // await nft_contract.toggleMintEnabled()
  await enableMint();
  var isMintEnabledAfter = await nft_contract.isMintEnabled();
  console.log(`IsMintEnabled: ${isMintEnabledAfter}`);
  // await setMaxSupply(100);
  // var supply = await nft_contract.MAX_SUPPLY();
  // console.log(`TotalSupply: ${supply}`);
  // await setMintPrice(500);
  var mintPrice = await nft_contract.mintPrice();
  console.log(`MintPrice: ${mintPrice}`);
}

// main();

async function enableMint() {
  var isMintEnabled = await nft_contract.isMintEnabled();
  if (isMintEnabled == false) {
    const tx = await nft_contract.toggleMintEnabled();
    await tx.wait();
  }
}

async function setMaxSupply(supply) {
  const tx = await nft_contract.setMaxSupply(supply);
  await tx.wait();
}

async function setMintPrice(price) {
  const tx = await nft_contract.setmintPrice(price);
  await tx.wait();
}

async function safeMint(address, uri) {
  const tx = await nft_contract.safeMint(address, uri);
  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
