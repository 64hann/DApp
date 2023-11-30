import { Col, Row, Button, Accordion, Image } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useContext } from "react"
import "./components.css"
import { ViewContext } from "../context/ViewProvider"

import Popup from "reactjs-popup"

// const cardImageStyle = {
//   width: "50%",
//   height: "14rem",
//   objectFit: "cover",
// }

export const Heading = ({ title }) => {
  return (
    <Accordion.Header
      style={{
        fontFamily: "sohne-buch",
      }}
    >
      {title}
    </Accordion.Header>
  )
}

const TicketCard = ({
  ticketno,
  title,
  imageURL,
  date,
  id,
  artist,
  venue,
  isListed,
  handleUnlist,
  handleList,
  redeemable,
}) => {
  const { user } = useContext(ViewContext)
  const { address } = user
  return (
    <Accordion.Body>
      <Card className="ticket-card">
        <Row>
          <Col>
            <Image src={imageURL} fluid />
          </Col>
          <Col>
            <Card.Title
              style={{
                textAlign: "center",
                paddingTop: "12px",
                fontSize: "24px",
              }}
            >
              <b>{title}</b>
            </Card.Title>
            <Row>
              <Col style={{ textAlign: "left" }}>{date}</Col>
              <Col style={{ textAlign: "center", fontSize: "15px" }}>
                {venue}
              </Col>
              <Col
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {artist}
              </Col>
            </Row>
            <Card.Text style={{ textAlign: "center" }}>
              <b>Ticket ID: {ticketno}</b>
            </Card.Text>

            {isListed ? (
              <Button
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  handleUnlist(title, ticketno, address)
                }}
              >
                Unlist Ticket
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "black" }}
                onClick={() =>
                  handleList(title, ticketno, address, date, venue)
                }
              >
                List Ticket
              </Button>
            )}
            <br></br>
            {redeemable ? (
              <Popup
                trigger={
                  <Button style={{ marginTop: "2rem" }}>Redeem Ticket</Button>
                }
                position="top center"
              >
                <Card
                  style={{
                    textAlign: "center",
                    width: "30rem",
                    height: "25rem",
                  }}
                >
                  <Card.Title style={{ marginTop: "10px" }}>
                    Welcome to <b>{title}</b>!
                  </Card.Title>
                  <Card.Body>
                    <Card.Text style={{ marginTop: "10px" }}>
                      Scan to redeem your ticket!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Popup>
            ) : null}
          </Col>
          <Col style={{ alignItems: "flex-end" }}>
            <Image
              style={{ maxHeight: "20rem" }}
              src={require("../images/barcode.png")}
              fluid
            />
          </Col>
        </Row>
      </Card>
    </Accordion.Body>
  )
}

export { TicketCard }
