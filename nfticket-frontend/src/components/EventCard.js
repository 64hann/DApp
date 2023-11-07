import Card from "react-bootstrap/Card"
import "./card.css"

const cardImageStyle = {
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  width: "100%",
  height: "15rem",
  objectFit: "cover",
}

const EventCard = () => {
  return (
    <Card
      className="card"
      style={{
        borderRadius: "15px",
        width: "20rem",
        height: "22rem",
        margin: "10px",
      }}
    >
      <Card.Img
        style={cardImageStyle}
        variant="top"
        src="https://www.levistrauss.com/wp-content/uploads/2023/03/NewJeans_Hero.jpg"
        // src="https://ipfs.filebase.io/ipfs/QmchavCU2JPuLupWUR8ZJ6NdD1GZSJmNnaUj6LB1nGeFsp/Qma9Le1kRHunh2CqaGNmXQdwrBxS3bFj5BdF1P6axa1Xf1"
      />
      <Card.Body>
        <Card.Text>17 November 2023 (Sunday)</Card.Text>
        <Card.Title>Newjeans World Tour</Card.Title>
      </Card.Body>
    </Card>
  );
}

export { EventCard }
