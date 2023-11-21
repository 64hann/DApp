import { Col, Row } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"

const cardImageStyle = {
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  width: "100%",
  height: "15rem",
  objectFit: "cover",
}

const EventCard = ({ title, imageURL, date, id, artist }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    let param = title.replaceAll(" ", "-").toLowerCase()
    let path = `/events/${param}/${id}`
    navigate(path)
  }

  return (
    <Card
      className="event-card"
      style={{ borderRadius: "15px" }}
      onClick={handleCardClick}
    >
      <Card.Img style={cardImageStyle} variant="top" src={imageURL} />
      <Card.Body>
        <Row>
          <Col>{date}</Col>
          <Col style={{ textAlign: "right", fontWeight: "bold" }}>{artist}</Col>
        </Row>
        <div style={{ height: "15px" }}></div>
        <Card.Text>
          <b>{title}</b>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export { EventCard }
