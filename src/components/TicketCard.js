import { Col, Row, Button, Accordion } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import "./components.css"
import { putForSale, removeFromSale } from "../database/aws"
import { ViewContext } from "../context/ViewProvider"

const cardImageStyle = {
  borderRadius: "2px",
  width: "100%",
  height: "14rem",
  objectFit: "cover",
}

export const Heading = ({ title }) => {
  return (
    <Accordion.Header
      style={{
        paddingTop: "15px",
        fontFamily: "tabela-regular",
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
}) => {
  const { user } = useContext(ViewContext)
  const { address } = user
  return (
    <Accordion.Body>
      <Card
        className="ticket-card"
        style={{ borderRadius: "2px", objectFit: "contain" }}
      >
        <Row>
          <Col>
            <Card.Img style={cardImageStyle} variant="top" src={imageURL} />
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
            <Card.Body>
              <Card.Text>
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
              </Card.Text>
              <Card.Text style={{ textAlign: "center" }}>
                <b>Ticket ID: {ticketno}</b>
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center", margin: "0px" }}>
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
                  onClick={() => handleList(title, ticketno, address)}
                >
                  List Ticket
                </Button>
              )}
            </Card.Footer>
          </Col>
        </Row>
      </Card>
    </Accordion.Body>
  )
}

export { TicketCard }
