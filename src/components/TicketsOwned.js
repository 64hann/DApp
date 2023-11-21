import { useState, useEffect, useContext } from "react"
import { ViewContext } from "../context/ViewProvider"
import { nft_contract } from "../pages/EventDetails"

const TicketsOwned = () => {
  const [ownedTickets, setOwnedTickets] = useState([])
  const { user } = useContext(ViewContext)
  const { address } = user

  useEffect(() => {
    async function fetchTickets() {
      var tickets = await nft_contract.getAddressInfo(address)
      tickets = tickets.map((ticket) => ticket.toNumber())
      setOwnedTickets(tickets)
    }
    fetchTickets()
  }, [])

  return (
    <div>
      <hr height="1" />
      {ownedTickets.length > 0 ? (
        <>
          <div style={{ color: "white" }}>
            You have {ownedTickets.length} ticket
            {ownedTickets.length > 1 ? "s" : ""}!
          </div>
          <div style={{ color: "white" }}>
            {ownedTickets.map((ticket, index) => (
              <div key={index}>Ticket ID: {ticket}</div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default TicketsOwned
