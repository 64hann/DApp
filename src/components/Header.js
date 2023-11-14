import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { useContext } from 'react'
import { ViewContext } from '../context/ViewProvider'

import ConnectWallet from "./connectWallet"
import InstallAlert from "./extras/InstallAlert"
import DisplayAddress from "./extras/DisplayAddress"

const Header = () => {

  const { user, actions, bigNumberify } = useContext(ViewContext)
  const { address } = user
  console.log(address)

  const ethGa = '0.01'
  const ethVip = '0.02'
  const ethGaHex = bigNumberify(ethGa)._hex
  const ethVipHex = bigNumberify(ethVip)._hex

  return (
    <Navbar 
      style={{ backgroundColor: "black", fontFamily:"tabela-bold" }}
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
        <Form class="me-3">
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Find Events"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button class="me-3" type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
          { address !== ""
            ? <DisplayAddress />
            // : address && chainId && chainId !== 4
            //   ? <ConnectNetwork />
              : window.ethereum
                ? <ConnectWallet connect={actions.connect} />
                : <InstallAlert />
          }
      </Container>
    </Navbar>
  )
}

export { Header }
