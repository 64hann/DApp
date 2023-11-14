import { Col, Container, Row } from "react-bootstrap"
import { Header } from "../components/Header"
import "./event.css"
import { EventList } from "../components/EventList"
import eventsJSON from "../testEvents.json"

const Events = () => {
  return (
    <div>
      <Header />
      <div style={{alignItems:"center", paddingLeft:"10%", paddingRight:"10%"}}>
        <h3
          style={{
            paddingTop: "15px",
            paddingLeft: "10px",

            color: "#ffffff",
            fontFamily: "tabela-regular",
          }}
        >
          Upcoming Events
        </h3>
        {eventsJSON.events.map((e) => (
          <EventList
            title={e.title}
            bannerURL={e.bannerURL}
            date={e.date}
            id={e.id}
          />
        ))}
      </div>
    </div>
  )
}

export { Events }
