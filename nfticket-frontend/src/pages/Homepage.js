import { Header } from "../components/Header"
import { EventCarousell } from "../components/Carousell"
import { Col, Container, Row } from "react-bootstrap"
import { EventCard } from "../components/EventCard"
import eventsJSON from "../testEvents.json"

const Homepage = () => {
  return (
    <div>
      <Header />
      <div style={{ height: "10px" }}></div>
      <div style={{ textAlign: "center" }}>
        <EventCarousell />
      </div>

      <div style={{ paddingLeft: "30px" }}>
        <div style={{ height: "10px" }}></div>
        <h2
          style={{ padding: "10px", color: "#ba3375", fontFamily: "charter" }}
        >
          New Events
        </h2>
        <div className="cardrow">
          {eventsJSON.events.map((e) => 
            <Col className="cardcol">
              <EventCard
                title={e.title}
                date={e.date}
                imageURL={e.imageURL}
                id={e.id}
              />
            </Col>
          )}
        </div>
      </div>
    </div>
  )
}

export { Homepage }
