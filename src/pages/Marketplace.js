import { useState, useEffect, useContext } from "react"
import { Button, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header"
import { SectionDescription, SectionTitle } from "../components/Titles"
import { getForSale, removeFromSale } from "../database/aws"
import { nft_contract, options } from "./EventDetails"
import { ViewContext } from "../context/ViewProvider"
import { fetchIPFSData } from "../deployments/upload";

const eventsJSON = await fetchIPFSData()
const numberOfEvents = await eventsJSON.events.length

const cardImageStyle = {
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  width: "20rem",
  height: "10rem",
  objectFit: "cover",
}

const Marketplace = () => {
  const { user } = useContext(ViewContext)
  const { address } = user
  const [ticketsForSale, setTicketsForSale] = useState([])
  const [tickets, setTickets] = useState([])
  const [sold, setSold] = useState(false)

  useEffect(() => {
    async function fetchTicketsForSale() {
      const tickets = await getForSale()
      setTickets(tickets)
      var addedIn = false
      for (var i=0; i<tickets.length; i++) {
        if (address !== tickets[i].address) {
          for (var j=0; j<ticketsForSale.length; j++) {
            if (tickets[i].tokenID === ticketsForSale[j].tokenID) {
              addedIn = true
            }
          }
          if (addedIn === false) {
            ticketsForSale.push(tickets[i])
          }
          addedIn = false
        }
      }
      console.log(ticketsForSale)
    }
    fetchTicketsForSale()
  }, [sold])

  async function sellTicket(ticket) {
    try {
      const tx = await nft_contract.transferToken(
        ticket.address,
        ticket.ticketno,
        options
      )
      await tx.wait()
      await removeFromSale(ticket)
      return alert("Transaction successful!")
    } catch (err) {
      console.log(err)
      return alert("Transaction failed. Please try again")
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
        <SectionDescription text="Before someone sends me a ss and says the img dont load, i'll add the image of the event from the eventsjson when we deploy a smart contract for each event" />
        <SectionDescription text="Explore our user-listed NFT ticket marketplace where each purchase is worry-free, backed by the assurance of blockchain verification." />
        {ticketsForSale.length > 0 ? (
          <>
            {ticketsForSale.map((t, i) => (
              <>
                <Card style={{ borderRadius: "5px", marginBottom: "10px", height: "10rem", whiteSpace:"nowrap" }}>
                  <Row>
                    <Card.Img style={cardImageStyle} variant="top" src={t.imageURL}/>
                    <Col>
                      <Card.Body>
                        <Card.Title>
                          <Row>
                            <Col><b>{t.title}</b></Col>
                          </Row>
                        </Card.Title>
                        <Card.Text>
                          <Row style={{ marginTop: "15px" }}>
                            <Col>{eventsJSON.events[i].date}</Col>
                            <Col
                              style={{
                                textAlign: "center", display:"inline-block"
                              }}
                            >
                              {eventsJSON.events[i].venue}
                            </Col>
                            <Col
                              style={{
                                textAlign: "right", marginRight: "10px"
                              }}
                            >
                              <b>Ticket ID:</b> {t.ticketno}
                            </Col>
                          </Row>
                        </Card.Text>
                        <Row style={{ marginTop: "25px" }}>
                          <Col
                            style={{
                              display:"inline-block", alignItems:"center"
                            }}
                          >
                            <b>Sold by: </b> {t.address}
                          </Col>
                          <Col
                            style={{
                              textAlign: "right"
                            }}
                          >
                            <Button
                              variant="primary"
                              style={{ backgroundColor: "black", marginRight: "20px" }}
                              onClick={() => {
                                sellTicket(t, ticketsForSale);
                              }}
                            >
                              Buy
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </>
            ))}
          </>

        ) : null}
      </div>
    </div>
  )
}

export { Marketplace }
