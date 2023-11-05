import { Header } from "../components/Header"
import { EventCarousell } from "../components/Carousell"
import { Col, Container, Row } from "react-bootstrap"
import { EventCard } from "../components/EventCard"

const Homepage = () => {
  return (
    <div>
      <Header />
      <EventCarousell />
      <br></br>
      <h3 style={{ margin: "10px" }}>New Events</h3>

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
        

    </div>
  )
}

export { Homepage }
