import { Navbar, Nav, Image, Container } from "react-bootstrap"

import { useContext } from "react"
import { ViewContext } from "../context/ViewProvider"

import ConnectWallet from "./ConnectWallet"
import InstallAlert from "./extras/InstallAlert"

const Header = () => {
  const { user, actions } = useContext(ViewContext)
  const { address } = user
  console.log(address)
  sessionStorage.setItem("metamask-address", address)

  function handleConnectWallet() {
    sessionStorage.setItem("metamask-address", address)
    actions.connect()
  }

  return (
    <Navbar className="navbar" data-bs-theme="dark">
      <Container>
        <Image
          src={require("../images/nfticket.png")}
          width="50"
          height="50"
          className="d-inline-block align-top"
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
          <ConnectWallet
            connect={() => {
              console.log(sessionStorage.getItem("metamask-address", address))
            }}
            text="Logged In"
            loggedIn={true}
          />
        ) : window.ethereum ? (
          <ConnectWallet
            connect={handleConnectWallet}
            text="Connect Wallet"
            loggedIn={false}
          />
        ) : (
          <InstallAlert />
        )}
      </Container>
    </Navbar>
  )
}

export { Header }
