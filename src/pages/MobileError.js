import React from "react"

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

export { MobileError }
