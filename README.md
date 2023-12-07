# DApp - NFTickets

## About The Project

Scams for event tickets, such as concert tickets, have been on the rise in Singapore. According to the Singapore Police Force, victims of concert ticket scams lost more than $480,000 to scammers (Koh, 2023). Scammers would list fraudulent concert tickets on platforms such as Carousell, Facebook, Telegram and Twitter. Victims would then approach the scammers via the application’s in-built chat function to purchase the listed ticket. Once the victims had paid the scammers for the ticket, the scammers would either delay sending the ticket to the victims or the victims would realise that the ticket is invalid on the concert day. 

Blockchain technologies offer an effective solution to this problem due to several factors. Here's why:

* The distributed ledger in blockchain records all the transactions made in the system, including the minting of new tickets. This prevents the creation of fraudulent tickets that can be resold to victims.
* Frauds are not only unable to create fraudulent tickets, but due to the immutable nature of blockchain, they are also unable to modify existing tickets in their favour. Frauds are unable to tamper with any of the records on the blockchain without their changes being noticed.
* Ticket buyers will be interacting directly with the blockchain through smart contracts when purchasing their tickets, which means that they would not have to trust third-party sellers for this transaction.


## Running the Frontend

### Dependencies

Ensure you have `npm` installed.

Install node packages

```
npm install
```

The app also requires [MetaMask](https://metamask.io/download/) to be installed on the Browser.

The app was developed using Chrome.

### Running

```
npm start
```

Runs the app in the development mode.

### Routing

Landing Page: [http://localhost:3000](http://localhost:3000)

- landing page for new users

Landing Page: [http://localhost:3000/homepage](http://localhost:3000/homepage)

- home page contains events and promotions

Events: [http://localhost:3000/events](http://localhost:3000/events)

- to view all events

Events Details (for each event) http://localhost:3000/events/:title/:id

- takes in the event `title` and event `id` as url params
- uses the `id` to fetch event data

Marketplace: [http://localhost:3000/marketplace](http://localhost:3000/marketplace)

- buy user listed nftickets

My Tickets: [http://localhost:3000/tickets](http://localhost:3000/tickets)

- metamask integration
- view tickets of a user
- list owned ticket on the marketplace

### Resource

A temporary json file has been set up to store event details. Currently, event details are being obtained from `eventData[id].json` in the src folder.

schema for each event:

```
{
  "events": [
    {
      "id": int,
      "title": str,
      "artist": str,
      "description": str,
      "imageURL": url,
      "bannerURL": url,
      "date": str,
      "venue": str
    }
  ]
}

```

### Database Calls

`getForSale` gets a list of tickets that are put up for sale.

- requires params:

```
params = {TableName: TABLE_NAME}
```

`putForSale`puts a new ticket for sale

- requires params:

```
params = {
        {TableName: TABLE_NAME},
        Item: {
            eventID: req["eventID"],
            tokenID: req["id"],
            title: req["title"],
            ticketno: req["ticketno"],
            address: req["address"],
            date: req["date"],
            venue: req["venue"],
            }
    }

```

`removeFromSale`deletes the ticket from the database

- requires params:

```
params = {
      TableName: TABLE_NAME,
      Key: {
        tokenID: req["tokenID"],
      },
    }
```

#### IPFS

`fetchIPFSData()` fetches data from IPFS.

#### Dynamo DB

## Smart Contract

The smart contract is named `Nfticket.sol` and is found in the path `src/contracts/Nfticket.sol` relative to root.

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

To enable mint, set mintPrice and set MaxSupply of tickets, run

```
node deployments/interact.js
```


### Built with
Our project uses the following frameworks and services:

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Ethers.js](https://docs.ethers.org/v6/)
- [MetaMask](https://docs.metamask.io/)
- [HardHat](https://hardhat.org/)
- [Alchemy](https://www.alchemy.com/)
- [Pinata](https://www.pinata.cloud/)
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
  

