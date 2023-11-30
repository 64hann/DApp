import { Header } from "../components/Header"

import { useContext, useEffect, useState } from "react"
import { ViewContext } from "../context/ViewProvider"

import TicketsOwned from "../components/TicketsOwned"
import { SectionTitle } from "../components/Titles"

const Wallet = () => {
  const { user } = useContext(ViewContext)
  const { address } = user

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
