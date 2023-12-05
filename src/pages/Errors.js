import React from "react"
import { useNavigate } from "react-router-dom"
import { NFTButton } from "../components/InteractiveElements"

const MobileError = () => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        alignContent: "center",
        color: "white",
        fontFamily: "sohne-buch",
      }}
    >
      <img
        style={{ maxWidth: "100%", height: "auto" }}
        src={require("../components/assets/nfticket.png")}
        alt="nfticket"
      ></img>

      <h1>Mobile Access Not Supported</h1>
      <p>Sorry, this application does not support mobile devices.</p>
      <p>Please use NFTicket on Desktop.</p>
    </div>
  )
}

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        alignContent: "center",
        color: "white",
        fontFamily: "sohne-buch",
      }}
    >
      <img
        style={{ maxWidth: "100%", height: "auto" }}
        src={require("../components/assets/nfticket.png")}
        alt="nfticket"
      ></img>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NFTButton onClick={() => navigate("/")} text="Take me back" />
    </div>
  )
}

const NoMetaMask = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        alignContent: "center",
        color: "white",
        fontFamily: "sohne-buch",
      }}
    >
      <img
        style={{ maxWidth: "100%", height: "auto" }}
        src={require("../components/assets/nfticket.png")}
        alt="nfticket"
      ></img>
      <h1>Please Install MetaMask</h1>
      <p>MetaMask Wallet is required to use NFTickets</p>
      <NFTButton onClick={() => navigate("/")} text="I've Installed MetaMask" />
    </div>
  )
}

export { MobileError, NotFoundPage, NoMetaMask }
