import { Header } from "../components/Header"
import { useParams } from "react-router-dom"
import { Button, Image } from "react-bootstrap"
// import eventsJSON from "../testEvents.json";
import { fetchIPFSData } from "../deployments/upload.js"

import { useContext } from "react"
import { ViewContext } from "../context/ViewProvider"

const eventsJSON = await fetchIPFSData()

const ethers = require("ethers")
const contract = require("../artifacts/contracts/sample_nft_ticket.sol/Nfticket.json")
const CONTRACT_ADDRESS = "0xe7ee2f4695a5bd4d28634255f7a082755f0f39f5"
const CID = "ipfs://QmYfTFjZ5RCi8fzGEBxudrgNRVsDNN9uTN7dXwZzkYL5E1"
const { ethereum } = window
const provider = new ethers.providers.Web3Provider(ethereum)
const signer = provider.getSigner()
const nft_contract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)

const options = {
  value: ethers.utils.parseEther("0.0000000000000005"),
  gasLimit: 500000,
}

const EventDetails = () => {
  const params = useParams()
  const event = eventsJSON.events[params.id]
  // const USER_ADDRESS = sessionStorage.getItem("metamask-address")
  const { user } = useContext(ViewContext)
  const { address } = user

  //TODO: Move function to a separate file
  async function mint() {
    if (!address) {
      return alert("Please log in to MetaMask")
    }
    try {
      await nft_contract.safeMint(address, CID, options)

      //////////////////////// add nft?
      try {
        // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
        const wasAdded = await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC721",
            options: {
              address: "0xE7ee2F4695a5BD4D28634255F7a082755f0F39F5", // The address of the token.
              tokenId: "11",
            },
          },
        })

        if (wasAdded) {
          console.log("User successfully added the token!")
        } else {
          console.log("User did not add the token.")
        }
      } catch (error) {
        console.log(error)
      }
      ////////////////////////
    } catch (error) {
      console.error(error)
      return alert("Transaction failed. Please try again")
    }
  }
  return (
    <div>
      <Header />
      <div style={{ height: "10px" }}></div>
      <div style={{ textAlign: "center" }}>
        <Image src={event.bannerURL} fluid />
      </div>
      <div style={{ height: "10px" }}></div>
      <div style={{ marginLeft: "10px" }}>
        <h3 style={{ padding: "10px", color: "#ffffff" }}>{event.title}</h3>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {event.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {event.venue}
        </p>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {event.description}
        </p>
        <Button style={{ marginLeft: "10px" }} onClick={mint}>
          BUY TICKETS
        </Button>
      </div>
    </div>
  )
}

export { EventDetails }
