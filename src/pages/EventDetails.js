import { Header } from "../components/Header"
import { PageBreak } from "../components/Titles.js"
import { useParams } from "react-router-dom"
import { Image, Form } from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
import { ViewContext } from "../context/ViewProvider"
import Popup from "../components/Popup.js"
import { MintButton } from "../components/InteractiveElements.js"
import {
  CONTRACT_ADDRESS_0,
  CONTRACT_ADDRESS_1,
  CID_0,
  CID_1,
  CID_2,
  CONTRACT_ADDRESS_2,
} from "../constants/constants.js"
import { States, GetContracts } from "../utils/services.js"
import {
  EVENTS_JSON_0,
  EVENTS_JSON_1,
  EVENTS_JSON_2,
} from "../constants/constants"
const eventsJSON = [
  ...EVENTS_JSON_0["events"],
  ...EVENTS_JSON_1["events"],
  ...EVENTS_JSON_2["events"],
]

const ethers = require("ethers")
const listOfContracts = await GetContracts()

const listOfCIDs = [CID_0, CID_1, CID_2]

const EventDetails = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [state, setState] = useState(States)
  const [mintPrice, setMintPrice] = useState(null)
  const [maxSupply, setMaxSupply] = useState(0)
  const [curSupply, setCurSupply] = useState(0)
  const [numberOfTickets, setNumberOfTickets] = useState(1)

  const openPopUp = () => {
    setShowPopup(!showPopup)
  }

  const params = useParams()
  const event = eventsJSON[params.id]
  const index = event.id
  const { user } = useContext(ViewContext)
  const { address } = user
  const nft_contract = listOfContracts[index]
  const CID = listOfCIDs[index]

  useEffect(() => {
    async function fetchMintPrice() {
      try {
        const price = await nft_contract.mintPrice()
        setMintPrice(price.toString())
      } catch (err) {
        console.log("User not logged in")
      }
    }

    async function fetchMaxSupply() {
      try {
        const supply = await nft_contract.maxSupply()
        setMaxSupply(supply.toString())
      } catch (err) {
        console.log("User not logged in")
      }
    }
    async function fetchCurSupply() {
      try {
        const supply = await nft_contract.totalSupply()
        setCurSupply(supply.toString())
      } catch (err) {
        console.log("User not logged in")
      }
    }
    fetchMintPrice()
    fetchMaxSupply()
    fetchCurSupply()
  }, [])

  function handleNumberChange(e) {
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
          {mintPrice / Math.pow(10, 18)} Eth / Ticket
        </p>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {curSupply}/{maxSupply} Tickets Minted
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
