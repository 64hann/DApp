import { Header } from "../components/Header"
import { PageBreak } from "../components/Titles.js"
import { useParams } from "react-router-dom"
import { Image, Form } from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
import { ViewContext } from "../context/ViewProvider"
import Popup from "../components/Popup.js"
import { MintButton } from "../components/InteractiveElements.js"
import { CONTRACT_ADDRESS_0, CID_0, EVENTS_JSON } from "../constants/constants.js";
import { fetchIPFSData } from "../database/IPFS/upload.js"

import {
  EVENTS_JSON_0,
  EVENTS_JSON_1,
  EVENTS_JSON_2,
} from "../constants/constants";

const eventsJSON = [
  ...EVENTS_JSON_0["events"],
  ...EVENTS_JSON_1["events"],
  ...EVENTS_JSON_2["events"],
];

const ethers = require("ethers");
const contract = require("../artifacts/contracts/Nfticket.sol/Nfticket.json");
// const CONTRACT_ADDRESS = "0x37D6f533B19bB53683bDA0696476dF0043428075";
// const CID = "ipfs://QmYfTFjZ5RCi8fzGEBxudrgNRVsDNN9uTN7dXwZzkYL5E1";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

export const nft_contract = new ethers.Contract(
  CONTRACT_ADDRESS_0,
  contract.abi,
  signer
)

export const options = {
  value: ethers.utils.parseEther("0.0000000000000005"),
  gasLimit: 500000,
}
export const States = {
  Loading: false,
  isError: false,
}


const EventDetails = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [state, setState] = useState(States)
  const [mintPrice, setMintPrice] = useState(null)
  const [numberOfTickets, setNumberOfTickets] = useState(1)

  const openPopUp = () => {
    setShowPopup(!showPopup)
  }

  const params = useParams()
  const event = eventsJSON[params.id]
  const { user } = useContext(ViewContext)
  const { address } = user
  var tokenId = null
  useEffect(() => {
    async function fetchMintPrice() {
      const price = await nft_contract.mintPrice()
      setMintPrice(price.toString())
    }
    fetchMintPrice()
  }, [])

  const handleNumberChange = (e) => {
    setNumberOfTickets(e.target.value)
  }

  async function mint() {
    if (!address) {
      return alert("Please log in to MetaMask")
    }
    try {
      setShowPopup(true)
      setState({ ...States, Loading: true })
      const tx = await nft_contract.safeMint(address, CID, numberOfTickets, {
        value: ethers.utils.parseUnits(
          (mintPrice * numberOfTickets).toString(),
          0
        ),
        gasLimit: 500000 * numberOfTickets,
      })
      await tx.wait()
      setState({ ...States, Loading: false, isError: false })
    } catch (error) {
      console.log(error)
      setState({ ...States, Loading: false, isError: true })
    }
  }

  return (
    <div>
      <Header />
      <PageBreak height="16px" />

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
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {mintPrice} Eth / Ticket
        </p>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          Note before buying: Users may only mint up to 6 tickets. Tickets
          transferred outside NFTicket may no longer be valid.
        </p>
        <Form>
          <Form.Label
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              color: "#ffffff",
            }}
          >
            Number of Tickets:
          </Form.Label>
          <Form.Control
            style={{
              marginLeft: "10px",
              width: "100px",
            }}
            type="number"
            value={numberOfTickets}
            onChange={handleNumberChange}
            min={1}
            max={6}
          />
        </Form>
        <MintButton
          style={{
            marginLeft: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          onClick={mint}
          text="Mint Tickets"
        />

        <Popup show={showPopup} handleClose={openPopUp} state={state} />
      </div>
    </div>
  )
}

export { EventDetails }
