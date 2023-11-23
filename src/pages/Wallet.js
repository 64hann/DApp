import { Header } from "../components/Header"

import { useContext } from "react"
import { ViewContext } from "../context/ViewProvider"

import TicketsOwned from "../components/TicketsOwned"
import { SectionTitle } from "../components/Titles"

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
      <div
        style={{
          alignItems: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        {!address ? (
          <SectionTitle text="Please connect to MetaMask to view your tickets!" />
        ) : (
          <TicketsOwned />
        )}
      </div>
    </div>
  )
}

export { Wallet }
