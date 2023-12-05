import { useState, useEffect, useContext } from "react";
import { ViewContext } from "../context/ViewProvider";
import { listOfContracts, nft_contract } from "../pages/EventDetails";
import { Col, Accordion } from "react-bootstrap";
import { TicketCard, Heading } from "./TicketCard";
import { PageBreak, SectionDescription, SectionTitle } from "./Titles";
import { getForSale, removeFromSale, putForSale } from "../database/dynamo/aws";
import "./components.css";
import {
  EVENTS_JSON_0,
  EVENTS_JSON_1,
  EVENTS_JSON_2,
} from "../constants/constants";

const eventsJSON = [
  ...EVENTS_JSON_0["events"],
  ...EVENTS_JSON_1["events"],
  ...EVENTS_JSON_2["events"],
];
const numberOfEvents = await eventsJSON.length;

const TicketsOwned = () => {
  const [ownedTickets, setOwnedTickets] = useState(
    Array.from({ length: numberOfEvents }, (v) =>
      Array.from({ length: 6 }, (v) => null)
    )
  );
  const [totalTickets, setTotalTickets] = useState(0);
  const { user } = useContext(ViewContext);
  const { address } = user;

  const [ticketsForSale, setTicketsForSale] = useState([]);
  const [update, setUpdate] = useState(true);

  function handleList(title, ticketno, address, date, venue) {
    putForSale({
      title: title,
      ticketno: ticketno,
      address: address,
      id: ticketno + address + title,
      date: date,
      venue: venue,
    });
    setUpdate(!update);
  }

  function handleUnlist(title, ticketno, address) {
    removeFromSale({ tokenID: ticketno + address + title });
    setUpdate(!update);
  }

  useEffect(() => {
    async function fetchTickets() {
      //   for (var i = 0; i < eventsJSON.events.length; i++) {
      //     var tickets = await nft_contract.getAddressInfo(address)
      //     tickets = await tickets.map((ticket) => ticket.toNumber())
      //     ticketCounter += tickets.length
      //     ownedTickets[i] = tickets
      //   }

      var ticketCounter = 0;
      var tickets;

      // listOfContracts.forEach((nft_contract, index) => async () => {
      //   console.log(nft_contract, index)
      //   tickets = await nft_contract.getTicketsOwned(address);
      //   console.log(tickets)
      //   tickets = await tickets.map((ticket) => ticket.toNumber());
      //   console.log(tickets);
      //   ticketCounter += tickets.length;
      //   ownedTickets[index] = tickets;
      // });
      var tickets = await listOfContracts[0].getTicketsOwned(address);

      tickets = await tickets.map((ticket) => [
        eventsJSON[0].title,
        ticket.toNumber(),
      ]);
      console.log(tickets);
      ticketCounter += tickets.length;

      // Hard code just one event first
      ownedTickets[0] = tickets;

      //2nd event
      tickets = await listOfContracts[1].getTicketsOwned(address);
      tickets = await tickets.map((ticket) => [
        eventsJSON[1].title,
        ticket.toNumber(),
      ]);
      console.log(tickets);
      ticketCounter += tickets.length;
      ownedTickets[1] = tickets;

      //3rd event
      tickets = await listOfContracts[2].getTicketsOwned(address);
      tickets = await tickets.map((ticket) => [
        eventsJSON[2].title,
        ticket.toNumber(),
      ]);
      ticketCounter += tickets.length;
      ownedTickets[2] = tickets;

      setTotalTickets(ticketCounter);
      // console.log(ownedTickets)
      // tickets = listOfContracts.forEach((nft_contract, index) => async () =>{
      //   console.log(nft_contract, index)
      //   tickets = await nft_contract.getTicketsOwned(address);
      //   console.log(tickets)
      //   tickets = await tickets.map((ticket) => ticket.toNumber());
      //   console.log(tickets);
      //   ticketCounter += tickets.length;
      //   ownedTickets[index] = tickets;

      // })
      // console.log(tickets)

      // setOwnedTickets(tickets)
      // console.log(ownedTickets)
    }

    fetchTickets();

    async function fetchTicketsForSale() {
      var tickets = await getForSale();
      setTicketsForSale(
        tickets.map((ticket) => [ticket.title, ticket.ticketno])
      );
      // console.log(tickets.map((ticket) => ticket.ticketno))
      console.log("Tickets for Sale", ticketsForSale);
    }

    fetchTicketsForSale();
  }, [update]);

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
                {event[id] ? (
                  <>
                    <PageBreak height="30px" />
                    <Accordion.Item
                      eventKey={id}
                      style={{ backgroundColor: "black" }}
                    >
                      <Heading title={eventsJSON[id].title} />
                      {event.map((ticket, idx) => (
                        <Col className="acc-body" eventkey={idx}>
                          <TicketCard
                            ticketno={ticket[1]}
                            title={eventsJSON[id].title}
                            date={eventsJSON[id].date}
                            imageURL={eventsJSON[id].imageURL}
                            id={eventsJSON[id].id}
                            artist={eventsJSON[id].artist}
                            venue={eventsJSON[id].venue}
                            isListed={ticketsForSale.some(e => e.length == ticket.length && e.every((value, index) => value === ticket[index]))}
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
  );
};

export default TicketsOwned;
