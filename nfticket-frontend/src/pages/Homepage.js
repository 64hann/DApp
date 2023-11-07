import { Header } from "../components/Header"
import { EventCarousell } from "../components/Carousell"
import { Col, Container, Row } from "react-bootstrap"
import { EventCard } from "../components/EventCard"

const Homepage = () => {
  return (
    
    <div style={{backgroundColor:"black"}} >
      <Header />
      <EventCarousell />
      <div style={{height: "10px", backgroundColor:"black"}}></div>
      <span>
      <h3 style={{ padding: "10px", backgroundColor:"black", color:"white" }}>New Events</h3>
      </span>
      <span>
      <div className="cardrow">
        <Col className="cardcol">
          <EventCard />
        </Col>
        <Col className="cardcol">
          <EventCard />
        </Col>
        <Col className="cardcol">
          <EventCard />
        </Col>
        <Col className="cardcol">
          <EventCard />
        </Col>
        <Col className="cardcol">
          <EventCard />
        </Col>
        <Col className="cardcol">
          <EventCard />
        </Col>
      </div>
      </span>
      
    </div>
  )
}

export { Homepage }
