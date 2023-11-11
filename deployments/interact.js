


require("dotenv").config({ path: "../.env" });
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

//  import the ABI
const contract = require("../artifacts/contracts/sample_nft_ticket.sol/Nfticket.json");

// console.log(JSON.stringify(contract.abi));

// create an instance of contract to interact with it

const ethers =  require('ethers')

//Provider - node provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);


//Signer -> eth account that signs the txn
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//Contract -> deployed contact
const nft_contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);


// Call functions inside nftcontract
async function main() {
    // var isMintEnabled = await nft_contract.isMintEnabled()
    // console.log(`IsMintEnabled: ${isMintEnabled}`);
    // await nft_contract.toggleMintEnabled()
    await enableMint()
    var isMintEnabledAfter = await nft_contract.isMintEnabled();
    console.log(`IsMintEnabled: ${isMintEnabledAfter}`);
    await setMaxSupply(100)
    var supply = await nft_contract.MAX_SUPPLY();
    console.log(`TotalSupply: ${supply}`);
    await setMintPrice(500)
    var mintPrice = await nft_contract.mintPrice();
    console.log(`MintPrice: ${mintPrice}`);
}

main()

async function enableMint() {
    var isMintEnabled = await nft_contract.isMintEnabled();
    if (isMintEnabled == false) {
        const tx = await nft_contract.toggleMintEnabled();
        await tx.wait()
    }
}

async function setMaxSupply(supply) {
    const tx = await nft_contract.setMaxSupply(supply);
    await tx.wait()
}

async function setMintPrice(price) {
    const tx = await nft_contract.setmintPrice(price)
    await tx.wait()
}

