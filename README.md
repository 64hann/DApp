# DApp


## Smart Contract

The smart contract is named sample_nft_ticket.sol



Firstly, call the ```setMintPrice(uint256 mint_price)``` to set a minting price, in gwei. 

Then call the ```setMaxSupply(uint256 max_supply)``` to set the total supply of the NFTs.

Then call the ```toggleMintEnabled()``` to enable the minting of NFTs.

To mint an NFT, call the  ```safeMint(address to, string memory uri)```, where address is the caller of the smart contract and uri is the IPFS hash which contains the metadata of the NFT. 
In order for the function to be called successfully, the caller must input the correct amount of gwei, there are still NFTs available, and the caller has not reached his personal NFT limit.

```OwnerOf``` property can be called to check that the owner of the NFT is correct 


To transfer the token from one to another, the ```transferToken(address payable  from, uint256 tokenId)``` can be called, which transfers the NFT from from to the caller of the function. In order for this function to execute properly,
the caller must input the correct amount of gwei. The token will be transferred from from to the caller of the function, and from receives the payment.




