import { Col, Container, Row } from "react-bootstrap"
import { Header } from "../components/Header"
import "./event.css"
import { EventList } from "../components/EventList"
import eventsJSON from "../testEvents.json"


const Events = () => {
  return (
    <div>
      <Header />
      <h2 style={{ padding: "10px", color:"#ba3375"}}>Upcoming Events</h2>
      <Container >
          <Col>
            {eventsJSON.events.map((e) => <EventList title={e.title} bannerURL={e.bannerURL} date={e.date} id={e.id}/>)}
          </Col>
      </Container>
    </div>
  )
}

export { Events }
