import { Col, Row, Button, Accordion, Image } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useContext } from "react"
import "./components.css"
import { ViewContext } from "../context/ViewProvider"


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
            <Card.Img
              src={imageURL}
              style={{
                maxHeight: "17rem",
                width: "auto",
                objectFit: "cover",
                padding: "10px",
              }}
              fluid
            />
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
                className="d-flex flex-grow-1"
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
          </Col>
          <Col style={{ alignItems: "flex-end" }}>
            <Card.Img
              style={{
                maxHeight: "17rem",
                width: "auto",
                objectFit: "cover",
                padding: "10px",
              }}
              src={require("../components/assets/qr-code.png")}
              fluid
            />
          </Col>
        </Row>
      </Card>
    </Accordion.Body>
  )
}

export { TicketCard }
