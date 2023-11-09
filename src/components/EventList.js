import React, { useEffect } from "react"
import Card from "react-bootstrap/Card"
import "./cards.css"
import { useNavigate } from "react-router-dom"

const cardImageStyle = {
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  width: "100%",
  height: "15rem",
  objectFit: "cover",
}

const EventList = (props) => {
  const title = props.title
  const bannerURL = props.bannerURL
  const date = props.date
  const id = props.id
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
      <Card.Img
        style={cardImageStyle}
        variant="top"
        src={bannerURL}
      />
      <Card.Body>
        <Card.Text>{date}</Card.Text>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export { EventList }
