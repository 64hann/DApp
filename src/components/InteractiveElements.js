import React, { useState } from "react"
import {
  Form,
  FormControl,
  InputGroup,
  Carousel,
  Image,
  Container,
} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

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
      style={{
        paddingTop: "15px",
        textAlign: "right",
      }}
      data-bs-theme="dark"
    >
      <InputGroup style={{ width: "60%", fontFamily: "sohne-buch" }}>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} spin />
        </InputGroup.Text>
        <FormControl
          type="search"
          className="me-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
    </Form>
  )
}

export { NFTButton, EventCarousell, FilterSearchBar }
