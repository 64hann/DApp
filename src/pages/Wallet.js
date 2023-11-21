import { Header } from "../components/Header"

import { useContext } from "react"
import { ViewContext } from "../context/ViewProvider"

import TicketsOwned from "../components/TicketsOwned"

const Wallet = () => {
  const { user, actions, bigNumberify } = useContext(ViewContext)
  const { address } = user
  console.log(address)

  const ethGa = "0.01"
  const ethVip = "0.02"
  const ethGaHex = bigNumberify(ethGa)._hex
  const ethVipHex = bigNumberify(ethVip)._hex

  return (
    <div>
      <Header />
      {/* Tickets Owned Display */}
      {!address ? (
        <h3 style={{ color: "white", paddingLeft: "30px" }}>
          Please Connect to MetaMask to view your tickets!
        </h3>
      ) : (
        // : chainId && (chainId !== 4)
        //   ? <div>Not Connected to Rinkeby ({chainId})</div>
        <TicketsOwned />
      )}
    </div>
  )
}

export { Wallet }
