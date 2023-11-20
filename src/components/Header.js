import { Navbar, Nav, Image, Container } from "react-bootstrap"

import { useContext } from "react"
import { ViewContext } from "../context/ViewProvider"

import ConnectWallet from "./ConnectWallet"
import InstallAlert from "./extras/InstallAlert"
import DisplayAddress from "./extras/DisplayAddress"

const Header = () => {
  const { user, actions, bigNumberify } = useContext(ViewContext)
  const { address } = user
  console.log(address)

  const ethGa = "0.01"
  const ethVip = "0.02"
  const ethGaHex = bigNumberify(ethGa)._hex
  const ethVipHex = bigNumberify(ethVip)._hex

  return (
    <Navbar className="navbar" data-bs-theme="dark" expand="lg">
      <Container>
        <Image
          src={require("../images/nfticket.png")}
          width="50"
          height="50"
          className="d-inline-block align-top" // Bootstrap class for alignment
        />
        <Navbar.Brand
          style={{
            fontSize: "30px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          href="/"
        >
          NFT<span style={{ fontFamily: "sohne-buch-light" }}>icket</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/tickets">My Tickets</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {address !== "" ? (
          <DisplayAddress />
        ) : window.ethereum ? (
          <ConnectWallet connect={actions.connect} />
        ) : (
          <InstallAlert />
        )}
      </Container>
    </Navbar>
  )
}

export { Header }
