import React, { useState } from "react"
import { Form, FormControl, Carousel, Image, Container } from "react-bootstrap"

const NFTButton = ({ text, onClick }) => {
  return (
    <button className="nft-button" onClick={onClick}>
      {text}
    </button>
  )
}

const EventCarousell = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <Container>
          <Image
            src="https://static.ticketmaster.sg/images/activity/24_taylorswift_709786be82b4d95608e614476288f5f1.jpg"
            fluid
          />
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <Image
            src="https://static.ticketmaster.sg/images/activity/23_oneokrock_5c68158a440283dc73f0e0ac6891f125.jpg"
            fluid
          />
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <Image
            src="https://static.ticketmaster.sg/images/activity/23_johnny_52e445f6d4de8b20c7099edc4fae13fc.jpg"
            fluid
          />
        </Container>
      </Carousel.Item>
    </Carousel>
  )
}

const FilterSearchBar = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)
    if (onFilter) {
      onFilter(term)
    }
  }

  return (
    <Form
      className="d-flex justify-content-end"
      style={{ paddingTop: "15px", textAlign: "right" }}
    >
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "50%" }}
      />
    </Form>
  )
}

export { NFTButton, EventCarousell, FilterSearchBar }
