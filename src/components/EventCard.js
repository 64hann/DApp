import Card from "react-bootstrap/Card"
import "./cards.css"
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

const EventCard = (props) => {
  const title = props.title
  const imageURL = props.imageURL
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
      className="event-card"
      style={{ borderRadius: "15px" }}
      onClick={handleCardClick}
    >
      <Card.Img
        style={cardImageStyle}
        variant="top"
        src={imageURL}
      />
      <Card.Body>
        <Card.Text>{date}</Card.Text>
        <Card.Text><b>{title}</b></Card.Text>
      </Card.Body>
    </Card>
  )
}

export { EventCard }
