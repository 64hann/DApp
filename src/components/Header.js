import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const Header = () => {
  return (
    <Navbar 
      style={{ backgroundColor: "black", fontFamily:"charter" }}
      data-bs-theme="dark"
      expand="lg"    >
      <Container>
        <Navbar.Brand href="/">NFTicket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/tickets">My Tickets</Nav.Link>
            {/* <Nav.Link href="/about">About</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        <Form>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Find Events"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  )
}

export { Header }
