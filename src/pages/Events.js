import { Header } from "../components/Header"
import React, { useState } from "react"
import "./event.css"
import { EventList } from "../components/EventList"
import { SectionTitle } from "../components/Titles"
import { Col, Row } from "react-bootstrap"
import { FilterSearchBar } from "../components/InteractiveElements"
import {
  EVENTS_JSON_0,
  EVENTS_JSON_1,
  EVENTS_JSON_2,
} from "../constants/constants"

const eventsJSON = [
  ...EVENTS_JSON_0["events"],
  ...EVENTS_JSON_1["events"],
  ...EVENTS_JSON_2["events"],
]
const Events = () => {
  const [data, setData] = useState(eventsJSON)
  const [filteredData, setFilteredData] = useState(eventsJSON)

  function handleFilter(searchTerm) {
    const filtered = data.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredData(filtered)
  }

  return (
    <div>
      <Header />
      <div
        style={{
          alignItems: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Row>
          <Col>
            {" "}
            <SectionTitle text="Upcoming Events" />
          </Col>
          <Col style={{ textAlign: "right" }}>
            <FilterSearchBar onFilter={handleFilter} />
          </Col>
        </Row>

        {filteredData.map((e) => (
          <EventList
            key={`event-${e.id}`}
            title={e.title}
            bannerURL={e.bannerURL}
            date={e.date}
            id={e.id}
            artist={e.artist}
          />
        ))}
      </div>
    </div>
  )
}

export { Events }
