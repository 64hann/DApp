import { useState, useEffect, useContext } from "react"
import { ViewContext } from "../context/ViewProvider"
import { nft_contract } from "../pages/EventDetails"
import { Col, Accordion } from "react-bootstrap"
import { TicketCard, Heading } from "./TicketCard"
import { PageBreak, SectionDescription, SectionTitle } from "./Titles"
import { getForSale, removeFromSale, putForSale } from "../database/aws"
import "./components.css"
import { EVENTS_JSON } from "../constants/constants"

const eventsJSON = EVENTS_JSON
const numberOfEvents = await eventsJSON.events.length

const TicketsOwned = () => {
  const [ownedTickets, setOwnedTickets] = useState(
    Array.from({ length: numberOfEvents }, (v) =>
      Array.from({ length: 6 }, (v) => null)
    )
  )
  const [totalTickets, setTotalTickets] = useState(0)
  const { user } = useContext(ViewContext)
  const { address } = user

  const [ticketsForSale, setTicketsForSale] = useState([])
  const [update, setUpdate] = useState(true)

  function handleList(title, ticketno, address, date, venue) {
    putForSale({
      title: title,
      ticketno: ticketno,
      address: address,
      id: ticketno + address + title,
      date: date,
      venue: venue,
    })
    setUpdate(!update)
  }

  function handleUnlist(title, ticketno, address) {
    removeFromSale({ tokenID: ticketno + address + title })
    setUpdate(!update)
  }

  useEffect(() => {
    async function fetchTickets() {
      //   for (var i = 0; i < eventsJSON.events.length; i++) {
      //     var tickets = await nft_contract.getAddressInfo(address)
      //     tickets = await tickets.map((ticket) => ticket.toNumber())
      //     ticketCounter += tickets.length
      //     ownedTickets[i] = tickets
      //   }

      var ticketCounter = 0
      var tickets = await nft_contract.getTicketsOwned(address)

      tickets = await tickets.map((ticket) => ticket.toNumber())
      console.log(tickets)
      ticketCounter += tickets.length

      // Hard code just one event first
      ownedTickets[0] = tickets
      // console.log(ownedTickets)

      setTotalTickets(ticketCounter)
      // setOwnedTickets(tickets)
      // console.log(ownedTickets)
    }

    fetchTickets()

    async function fetchTicketsForSale() {
      var tickets = await getForSale()
      setTicketsForSale(tickets.map((ticket) => ticket.ticketno))
      // console.log(tickets.map((ticket) => ticket.ticketno))
    }

    fetchTicketsForSale()
  }, [update])

  return (
    <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      <SectionTitle text="My Tickets" />
      {totalTickets > 0 ? (
        <>
          <SectionDescription
            text={`You have ${totalTickets} ticket${
              totalTickets > 1 ? "s" : ""
            } in total!`}
          />
          <Accordion className="accordion" style={{ fontWeight: "bold" }}>
            {ownedTickets.map((event, id) => (
              <>
                {event[0] ? (
                  <>
                    <PageBreak height="30px" />
                    <Accordion.Item
                      eventKey={id}
                      style={{ backgroundColor: "black" }}
                    >
                      <Heading title={eventsJSON.events[id].title} />
                      {event.map((ticket, idx) => (
                        <Col className="acc-body" eventkey={idx}>
                          <TicketCard
                            ticketno={ticket}
                            title={eventsJSON.events[id].title}
                            date={eventsJSON.events[id].date}
                            imageURL={eventsJSON.events[id].imageURL}
                            id={eventsJSON.events[id].id}
                            artist={eventsJSON.events[id].artist}
                            venue={eventsJSON.events[id].venue}
                            isListed={ticketsForSale.includes(ticket)}
                            handleList={handleList}
                            handleUnlist={handleUnlist}
                          />
                        </Col>
                      ))}
                    </Accordion.Item>
                  </>
                ) : null}
              </>
            ))}
          </Accordion>
        </>
      ) : (
        <>
          <SectionDescription text="You have no tickets! Go buy some!" />
        </>
      )}
    </div>
  )
}

export default TicketsOwned
