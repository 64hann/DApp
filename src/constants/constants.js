import { fetchIPFSData } from "../deployments/upload.js";

const CONTRACT_ADDRESS = "0x37D6f533B19bB53683bDA0696476dF0043428075";
const CID = "ipfs://QmYfTFjZ5RCi8fzGEBxudrgNRVsDNN9uTN7dXwZzkYL5E1";
const EVENTS_JSON = await fetchIPFSData();

export { CONTRACT_ADDRESS, CID, EVENTS_JSON};
