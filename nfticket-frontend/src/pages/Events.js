import { Col, Container, Row } from "react-bootstrap"
import { EventCard } from "../components/EventCard"
import { Header } from "../components/Header"
import "./event.css"

const Events = () => {
  return (
    <div>
      <Header />
      <h2 style={{margin: "10px"}}>Upcoming Events</h2>
<Container>
    <Row className="row">
      <Col><EventCard /></Col>
      <Col><EventCard /></Col>
      <Col><EventCard /></Col>
    </Row>
    <Row>
      <Col><EventCard /></Col>
      <Col><EventCard /></Col>
      <Col><EventCard /></Col>
    </Row>
    <Row>
      <Col><EventCard /></Col>
      <Col><EventCard /></Col>
      <Col><EventCard /></Col>
    </Row>

</Container>
    </div>
  )
}

export { Events }
