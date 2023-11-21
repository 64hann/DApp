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
        src={require("../images/nfticket.png")}
        alt="nfticket"
      ></img>

      <h1>Mobile Access Not Supported</h1>
      <p>Sorry, this application does not support mobile devices.</p>
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
        src={require("../images/nfticket.png")}
        alt="nfticket"
      ></img>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NFTButton onClick={() => navigate("/")} text="Take me back" />
    </div>
  )
}

export { MobileError, NotFoundPage }
