import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
// import eventsJSON from "../testEvents.json";
import { fetchIPFSData } from "../deployments/upload.js";

const eventsJSON = await fetchIPFSData();

const ethers = require("ethers");
const contract = require("../artifacts/contracts/sample_nft_ticket.sol/Nfticket.json");
const CONTRACT_ADDRESS = "0xe7ee2f4695a5bd4d28634255f7a082755f0f39f5";
const CID = "ipfs://QmYfTFjZ5RCi8fzGEBxudrgNRVsDNN9uTN7dXwZzkYL5E1";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const nft_contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

const options = {
  value: ethers.utils.parseEther("0.0000000000000005"),
  gasLimit: 500000,
};

const EventDetails = () => {
  const params = useParams();
  const event = eventsJSON.events[params.id];

  async function mint() {
    try {
      await nft_contract.safeMint(
        "0x40cea589e15a3cfe981001b048e33dce6bfbbd35", // change this to one obtained from wallet
        CID,
        options
      );
    } catch (error) {
      console.error(error);
      return alert("Transaction failed. Please try again");
    }
  }
  return (
    <div>
      <Header />
      <div style={{ height: "10px" }}></div>
      <div style={{ textAlign: "center" }}>
        <Image src={event.bannerURL} fluid />
      </div>
      <div style={{ height: "10px" }}></div>
      <div style={{ marginLeft: "10px" }}>
        <h3 style={{ padding: "10px", color: "#ffffff" }}>{event.title}</h3>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {event.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {event.venue}
        </p>
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#ffffff",
          }}
        >
          {event.description}
        </p>
        <Button style={{ marginLeft: "10px" }} onClick={mint}>
          BUY TICKETS
        </Button>
      </div>
    </div>
  );
};

export { EventDetails };
