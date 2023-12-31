import { Header } from "../components/Header"
import { EventCarousell } from "../components/InteractiveElements"
import { PageBreak } from "../components/Titles"
import { Col } from "react-bootstrap"
import { EventCard } from "../components/EventCard"
import {
  EVENTS_JSON_0,
  EVENTS_JSON_1,
  EVENTS_JSON_2,
} from "../constants/constants";

const eventsJSON = [
  ...EVENTS_JSON_0["events"],
  ...EVENTS_JSON_1["events"],
  ...EVENTS_JSON_2["events"],
];
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
            New Events
          </h3>
          {eventsJSON.map((e) => (
            <Col className="cardcol" key={`event-${e.id}`}>
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
