import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Header } from "../components/Header";
import { SectionDescription, SectionTitle } from "../components/Titles";
import { getForSale } from "../database/aws";

const Marketplace = () => {
  const [ticketsForSale, setTicketsForSale] = useState([]);

  useEffect(() => {
    async function fetchTicketsForSale() {
      const tickets =  await getForSale()
      setTicketsForSale(tickets);
      console.log(tickets);
    }
    fetchTicketsForSale();
  },[])
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
        <SectionTitle text="Marketplace" />
        <SectionDescription text="Explore our user-listed NFT ticket marketplace where each purchase is worry-free, backed by the assurance of blockchain verification." />
        {ticketsForSale.map((ticket, index) => (
          <div key={index}>Ticket ID: {(ticket["title"], ticket["ticketno"])}</div>
        ))}
      </div>
    </div>
  );
};

export { Marketplace };
