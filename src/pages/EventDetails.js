import { Header } from "../components/Header"
import { useParams } from "react-router-dom"
import { Button, Image } from "react-bootstrap"
import eventsJSON from "../testEvents.json"

const EventDetails = () => {
  const params = useParams()
  const event = eventsJSON.events[params.id]

  return (
    <div>
      <Header />
      <div style={{ height: "10px" }}></div>
      <div style={{ textAlign: "center" }}>
        <Image src={event.bannerURL} fluid />
      </div>
      <div style={{ height: "10px" }}></div>
      <div style={{ marginLeft: "10px" }}>
        <h3 style={{ padding: "10px", color: "#ffffff" }}>{event.title}</h3>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {event.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {event.venue}
        </p>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {event.description}
        </p>
        <Button style={{ marginLeft: "10px" }}>BUY TICKETS</Button>
      </div>
    </div>
  )
}

export { EventDetails }
