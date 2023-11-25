import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Header } from "../components/Header";
import { SectionDescription, SectionTitle } from "../components/Titles";
import { getForSale, removeFromSale } from "../database/aws";
import { nft_contract, options } from "./EventDetails";
import { ViewContext } from "../context/ViewProvider";

const Marketplace = () => {
  const [ticketsForSale, setTicketsForSale] = useState([]);
  const { user } = useContext(ViewContext)
  const { address } = user

  useEffect(() => {
    async function fetchTicketsForSale() {
      const tickets = await getForSale();
      setTicketsForSale(tickets);
      console.log(tickets);
    }
    fetchTicketsForSale();
  }, []);
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
            Ticket ID: {ticket["title"]}, {ticket["ticketno"]}
            <Button
              variant="primary"
              onClick={() => {
                try{
                  // nft_contract.transferToken()
                  //   );
                  removeFromSale(ticket);
                } catch (err) {
                  console.log(err);
                }
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
