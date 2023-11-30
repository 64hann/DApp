import { Header } from "../components/Header";
import { PageBreak } from "../components/Titles.js";
import { useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

import { fetchIPFSData } from "../deployments/upload.js";
import { useState, useContext, useEffect } from "react";
import { ViewContext } from "../context/ViewProvider";
import Popup from "../components/Popup.js";

const eventsJSON = await fetchIPFSData();

const ethers = require("ethers");
const contract = require("../artifacts/contracts/sample_nft_ticket.sol/Nftickets.json");
const CONTRACT_ADDRESS = "0x94adc27d2c58aCa144FB21ec99cFed2c9147bee5";
const CID = "ipfs://QmYfTFjZ5RCi8fzGEBxudrgNRVsDNN9uTN7dXwZzkYL5E1";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

export const nft_contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

export const options = {
  value: ethers.utils.parseEther("0.0000000000000005"),
  gasLimit: 500000,
};
export const States = {
  Loading: false,
  isError: false,
};

const EventDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [state, setState] = useState(States);
  const [mintPrice, setMintPrice] = useState(null);

  const openPopUp = () => {
    setShowPopup(!showPopup);
  };

  const params = useParams();
  const event = eventsJSON.events[params.id];
  const { user } = useContext(ViewContext);
  const { address } = user;
  var tokenId = null;
  // const mintPrice = nft_contract.mintPrice();
  useEffect(() => {
    async function fetchMintPrice() {
      const price = await nft_contract.mintPrice();
      setMintPrice(price.toString());
    }
    fetchMintPrice();
  }, []);

  //TODO: Move function to a separate file
  async function mint() {
    if (!address) {
      return alert("Please log in to MetaMask");
    }
    try {
      setShowPopup(true);
      setState({ ...States, Loading: true });

      const tx = await nft_contract.safeMint(address, CID, options);
      await tx.wait();
      var ticketsOwned = await nft_contract.getAddressInfo(address);
      console.log(ticketsOwned);
      tokenId = await ticketsOwned[ticketsOwned.length - 1]
        .toNumber()
        .toString();
      console.log(tokenId);
      if (tokenId != null && tokenId != undefined) {
        try {
          const wasAdded = await ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC721",
              options: {
                address: CONTRACT_ADDRESS,
                tokenId: tokenId, // The identifier of the asset to be added.
              },
            },
          });

          if (wasAdded) {
            console.log("User successfully added the token!");
          } else {
            console.log("User did not add the token.");
          }
          setState({ ...States, Loading: false, isError: false });
        } catch (error) {
          console.log(error);
          setState({ ...States, Loading: false, isError: true });
        }
      }
    } catch (error) {
      //TODO: Better Error Handling
      console.error(error);
      setState({ ...States, Loading: false, isError: true });
      // return alert("Transaction failed. Please try again");
    }
  }
  return (
    <div>
      <Header />
      <PageBreak height="10px" />

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
        <p>{mintPrice}</p>
        <Button style={{ marginLeft: "10px" }} onClick={mint}>
          BUY TICKETS
        </Button>

        <Popup show={showPopup} handleClose={openPopUp} state={state} />
      </div>
    </div>
  );
};

export { EventDetails };
