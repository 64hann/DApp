
async function main() {
  // We get the contract to deploy
  const NFTicket = await ethers.getContractFactory("Nftickets");
  console.log("Deploying nfticket...");
  const nft_ticket = await NFTicket.deploy(
    // can change this to your own address to make yourself the owner
    "0x2e9BeeeF9c36eBDb28ec2C4011C8b5e847EfB0B5"
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
