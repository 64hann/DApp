// scripts/deploy.js
// addresses created just for this
// const addresses = [
//   "0x994DA0359fe91390cc404330647D969F8E5c88B8",
//   "0x70639d0827e1761c1664c0031aB58dA0cD920940",
//   "0x1A0465892A2163068658df366531b13cd2cd569c",
//   "0xf3f98A55e5f16C0BC3fE2c79e5FDA942ffa36452",
//   "0x9fF53e5258c5e6E2E3FFbC343E24A8c76B700B0E",
//   "0xb20CDA87332b55484F1528d4A28bd2CeC312da7F",
//   "0xf8E01011e1d1E96e9476E38F317eBB4764DcfF06",
//   "0x3f2Cc26CcD6AA547eB166bE7b56F254fB24b60c5",
//   "0xdAA771Cec908b8f7582C619515aa4Aadc98c996b",
//   "0xBF79560b40f67da57180bfabe670D6251a3fd87f",
//   "0xCE5F647b9f558E73076B1dc5472dD2e30Ef832E9",
//   "0x8474bBeB3EAf09FA6E7507cFE6Ad78CCF0f6BAA9",
//   "0x5BdF7Ef05F1Fa36B856Dd13d9A69FD8DD3ae786D",
//   "0x43D17C69c333AA73A52B390B265C72F9e774C100",
//   "0x5c82391Ce6CB5d2b1DF188a5182225241Fa81243",
//   "0x32F969a4E983589d72475479f5E525D0dfbC2082",
//   "0x6A837FE8cbf67BbD1FbC17571667bfF2b952e0FB",
//   "0x3F1D0B80a56B042Ff3776986F37afDe44C6Af05a",
//   "0xc65d2a3D350648eA807f5FB6494b7c95c5B86533",
//   "0x7911db788E912d00e0601C3927d67aC49fe21845",
// ];
async function main() {
  // We get the contract to deploy
  const NFTicket = await ethers.getContractFactory("Nfticket");
  console.log("Deploying nfticket...");
  const nft_ticket = await NFTicket.deploy(
    // can change this to your own address to make yourself the owner
    "0x40cea589e15a3cFE981001B048E33DcE6BFBBD35"
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
