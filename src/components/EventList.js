import React from "react"
import { useNavigate } from "react-router-dom"
import { Col, Row, Card } from "react-bootstrap"

const cardImageStyle = {
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  width: "100%",
  height: "15rem",
  objectFit: "cover",
}

const EventList = ({ title, bannerURL, date, id, artist }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    let param = title.replaceAll(" ", "-").toLowerCase()
    let path = `/events/${param}/${id}`
    navigate(path)
  }

  return (
    <Card
      className="event-list"
      onClick={handleCardClick}
      style={{ borderRadius: "5px" }}
    >
      <Card.Img style={cardImageStyle} variant="top" src={bannerURL} />
      <Card.Body>
        <Card.Text>{date}</Card.Text>
        <Card.Title>
          <Row>
            <Col>{title}</Col>
            <Col
              style={{
                textAlign: "right",
              }}
            >
              by {artist}
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export { EventList }
