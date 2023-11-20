import { Header } from "../components/Header"
import { EventCarousell } from "../components/InteractiveElements"
import { PageBreak } from "../components/Titles"
import { Col } from "react-bootstrap"
import { EventCard } from "../components/EventCard"
// import eventsJSON from "../testEvents.json"
import { fetchIPFSData } from "../deployments/upload.js"

const eventsJSON = await fetchIPFSData()
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
                artist={e.artist}
              />
            </Col>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Homepage }
