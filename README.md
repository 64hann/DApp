# DApp

## Running the Frontend

The React App is saved within the `nfticket-frontend` directory.

### Dependencies

Ensure you have `npm` installed.

Install node packages `npm install`

### Running

`npm start`
Runs the app in the development mode.

### Routing

Homepage: [http://localhost:3000](http://localhost:3000)
- landing page for new users

Events: [http://localhost:3000/events](http://localhost:3000/events)
- to view all events

Events Details (for each event) http://localhost:3000/events/:title/:id 
- takes in the event `title` and event `id` as url params
- uses the `id` to fetch event data

My Tickets: [http://localhost:3000/tickets](http://localhost:3000/tickets)
- metamask integration

### Resource
A temporary json file has been set up to store event details. Currently, event details are being obtained from `testEvents.json` in the src folder.

schema for each event:

```
{
    "title": "",
    "artist": "",
    "description": "",
    "imageURL": "",
    "bannerURL": "",
    "date": "",
    "venue": "",
    "ticketCategories": {
    "cat1": {
        "price": "",
        "count": ""
    },
    "cat2": {
        "price": "",
        "count": ""
    }
    }
}
```

## Smart Contract

The smart contract is named sample_nft_ticket.sol

Firstly, call the `setMintPrice(uint256 mint_price)` to set a minting price, in gwei.

Then call the `setMaxSupply(uint256 max_supply)` to set the total supply of the NFTs.

Then call the `toggleMintEnabled()` to enable the minting of NFTs.

To mint an NFT, call the `safeMint(address to, string memory uri)`, where address is the caller of the smart contract and uri is the IPFS hash which contains the metadata of the NFT.
In order for the function to be called successfully, the caller must input the correct amount of gwei, there are still NFTs available, and the caller has not reached his personal NFT limit.

`OwnerOf` property can be called to check that the owner of the NFT is correct

To transfer the token from one to another, the `transferToken(address payable  from, uint256 tokenId)` can be called, which transfers the NFT from from to the caller of the function. In order for this function to execute properly,
the caller must input the correct amount of gwei. The token will be transferred from from to the caller of the function, and from receives the payment.




## Compiling and deploying smart contract

In order to run the following, create a .env file in `/src` directory

```
PRIVATE_KEY=YOUR_PRIVATE_KEY
USER_ADDRESS=YOUR_USER_ADDRESS
API_URL=ALCHEMY_API_URL
CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
CID=ipfs://YOUR_CID

```

To compile the smart contract, run (Make sure that node modules and hardhat.config.js are in the same directory)
```
npx hardhat compile
```


To deploy the smart contract, run 
```
npx hardhat run deployments/deploy.js --network sepolia

```


