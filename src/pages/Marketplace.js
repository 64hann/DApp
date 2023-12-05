import { useState, useEffect, useContext } from "react"
import { Button, Row, Col, Card } from "react-bootstrap"
import { Header } from "../components/Header"
import { SectionDescription, SectionTitle } from "../components/Titles"
import { getForSale, removeFromSale } from "../database/dynamo/aws.js"
import { listOfContracts, listOfOptions, nft_contract, options } from "./EventDetails"
import { States } from "./EventDetails"
import { ViewContext } from "../context/ViewProvider"
import Popup from "../components/Popup.js"
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

const cardImageStyle = {
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  width: "20rem",
  height: "9.8rem",
  objectFit: "cover",
}

const Marketplace = () => {
  const { user } = useContext(ViewContext)
  const { address } = user
  const [ticketsForSale, setTicketsForSale] = useState([])
  const [state, setState] = useState(States)
  const [showPopup, setShowPopup] = useState(false)

  const openPopUp = () => {
    setShowPopup(!showPopup)
  }
  const [tickets, setTickets] = useState([])
  const [sold, setSold] = useState(false)

  useEffect(() => {
    async function fetchTicketsForSale() {
      var ticketsList = await getForSale()
      setTickets(await ticketsList.map((ticket) => (ticket.title,ticket.tokenID)));
      var addedIn = false
      for (var i = 0; i < ticketsList.length; i++) {
        if (address !== ticketsList[i].address) {
          for (var j = 0; j < ticketsForSale.length; j++) {
            if (ticketsList[i].tokenID === ticketsForSale[j].tokenID) {
              addedIn = true
            }
          }
          if (addedIn === false) {
            ticketsForSale.push(ticketsList[i])
          }
          addedIn = false
        }
      }
      console.log(ticketsForSale)
    }
    fetchTicketsForSale()
  }, [sold, address])

  async function sellTicket(t) {
    try {
      console.log(t)
      setShowPopup(true)
      setState({ ...States, Loading: true })
      const index = eventsJSON.findIndex((e) => e.title === t.title)
      const tx = await listOfContracts[index].transferToken(
        t.address,
        t.ticketno,
        listOfOptions[index]
      )
      await tx.wait()
      await removeFromSale(t)
      setSold(true)
      setState({ ...States, Loading: false, isError: false })
      // return alert("Transaction successful!");
    } catch (err) {
      console.log(err)
      setState({ ...States, Loading: false, isError: true })
    }
  }
  return (
    <div>
      <Header />
      <div
        style={{
          alignItems: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <SectionTitle text="Marketplace" />
        <SectionDescription text="Explore our user-listed NFT ticket marketplace where each purchase is worry-free, backed by the assurance of blockchain verification." />
        {ticketsForSale.length > 0 ? (
          <>
            {ticketsForSale.map((t, i) => (
              <>
                <Card
                  eventkey={i}
                  className="marketplace-card"
                  style={{
                    borderRadius: "5px",
                    marginBottom: "10px",
                    height: "10rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Row>
                    <Card.Img
                      style={cardImageStyle}
                      src={require("../components/assets/block.jpeg")}
                    />
                    <Col>
                      <Card.Body>
                        <Card.Title>
                          <Row>
                            <Col>
                              <b>{t.title}</b>
                            </Col>
                          </Row>
                        </Card.Title>
                        <Card.Text>
                          <Row style={{ marginTop: "15px" }}>
                            <Col>{t.date}</Col>
                            <Col
                              style={{
                                textAlign: "center",
                                display: "inline-block",
                              }}
                            >
                              {t.venue}
                            </Col>
                            <Col
                              style={{
                                textAlign: "right",
                                marginRight: "10px",
                              }}
                            >
                              <b>Ticket ID:</b> {t.ticketno}
                            </Col>
                          </Row>
                        </Card.Text>
                        <Row style={{ marginTop: "25px" }}>
                          <Col
                            style={{
                              display: "inline-block",
                              alignItems: "center",
                            }}
                          >
                            <b>Sold by: </b> {t.address}
                          </Col>
                          <Col
                            style={{
                              textAlign: "right",
                            }}
                          >
                            {tickets.includes(t.tokenID) ? (
                              <Button
                                style={{
                                  backgroundColor: "black",
                                  marginRight: "20px",
                                }}
                                onClick={() => {
                                  sellTicket(t)
                                }}
                              >
                                Buy
                              </Button>
                            ) : (
                              <Button>Sold</Button>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
                <Popup show={showPopup} handleClose={openPopUp} state={state} />
              </>
            ))}
          </>
        ) : (
          <>
            <div style={{ color: "white" }}>
              You have no tickets! Go buy some!
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export { Marketplace }
