import { Container } from "react-bootstrap"
import Carousel from "react-bootstrap/Carousel"
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Image from "react-bootstrap/Image"

const EventCarousell = () => {
  return (
    <Carousel style={{backgroundColor:"black"}} data-bs-theme="dark">
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Container>
          <Image
            src="https://static.ticketmaster.sg/images/activity/24_taylorswift_709786be82b4d95608e614476288f5f1.jpg"
            fluid
          />
        </Container>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Container>
          <Image
            src="https://static.ticketmaster.sg/images/activity/23_oneokrock_5c68158a440283dc73f0e0ac6891f125.jpg"
            fluid
          />
        </Container>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Container>
          <Image
            src="https://static.ticketmaster.sg/images/activity/23_johnny_52e445f6d4de8b20c7099edc4fae13fc.jpg"
            fluid
          />
        </Container>
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  )
}

export { EventCarousell }
