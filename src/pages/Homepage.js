import { Header } from "../components/Header"
import { EventCarousell } from "../components/Carousell"
import { HomepageTitle } from "../components/HomepageTitle"
import { Col, Container, Row, Image } from "react-bootstrap"
import { EventCard } from "../components/EventCard"
// import eventsJSON from "../testEvents.json"
import { PageBreak } from "../components/PageBreak";
import { fetchIPFSData } from "../deployments/upload.js";

const eventsJSON = await fetchIPFSData();
const Homepage = () => {
  return (
    <div>
      <Header />
      <PageBreak height="30px" />
      <div style={{ textAlign: "center" }}>
        <EventCarousell />
      </div>
      <div style={{ paddingLeft: "30px" }}>
        <div style={{ height: "10px" }}></div>

        <div className="cardrow">
          <h3
            style={{
              paddingTop: "15px",
              color: "#ffffff",
              fontFamily: "tabela-regular",
            }}
          >
            NEW EVENTS
          </h3>
          {eventsJSON.events.map((e) => (
            <Col className="cardcol">
              <EventCard
                title={e.title}
                date={e.date}
                imageURL={e.imageURL}
                id={e.id}
              />
            </Col>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Homepage }
