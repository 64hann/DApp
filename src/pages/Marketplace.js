import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Header } from "../components/Header";
import { SectionDescription, SectionTitle } from "../components/Titles";
import { getForSale, removeFromSale } from "../database/aws";
import { nft_contract, options } from "./EventDetails";
import { ViewContext } from "../context/ViewProvider";


const Marketplace = () => {
  const [ticketsForSale, setTicketsForSale] = useState([])
  useEffect(() => {
    async function fetchTicketsForSale() {
      const tickets = await getForSale();
      setTicketsForSale(tickets);
    }
    fetchTicketsForSale();
  }, []);

  async function sellTicket(ticket) {
    try {
      const tx = await nft_contract.transferToken(
        ticket["address"],
        ticket["ticketno"],
        options
      );
      await tx.wait();
      await removeFromSale(ticket);
      return alert("Transaction successful!");
    } catch (err) {
      console.log(err);
      return alert("Transaction failed. Please try again");
    }
  }
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
          <div key={index}>
            Ticket ID: {ticket["title"]}, {ticket["ticketno"]}, {ticket["address"]}
            <Button
              variant="primary"
              onClick={() => {
                sellTicket(ticket);
              }}
            >
              Buy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Marketplace };
