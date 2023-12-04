import { fetchIPFSData } from "../database/IPFS/upload";

const CONTRACT_ADDRESS_0 = "0xBdE8f650F001dc73f16A144B1adD6739F182C4b3";
const CID_0 = "ipfs://QmX2QHBG8x2bq8Sok8kRte9r8g4aYDn8pbk27SL63m7TnZ";
const CID_1 = "ipfs://QmTJjcZWpJ9LKkymKtQdnytRqLAAG6DXq2qjTnodSR7wYt";
const CID_2 = "ipfs://QmQ3dn4aABbcV2NDYQkQ15yUA5ryTWKyyjEPAKy6Hn1vm6";
const EVENTS_JSON_0 = await fetchIPFSData(
  "QmX2QHBG8x2bq8Sok8kRte9r8g4aYDn8pbk27SL63m7TnZ"
);
const EVENTS_JSON_1 = await fetchIPFSData(
  "QmTJjcZWpJ9LKkymKtQdnytRqLAAG6DXq2qjTnodSR7wYt"
);  
const EVENTS_JSON_2 = await fetchIPFSData(
  "QmQ3dn4aABbcV2NDYQkQ15yUA5ryTWKyyjEPAKy6Hn1vm6"
);
const MINT_PRICE = 100000000000000000;
const MAX_SUPPLY = 100;

export { CONTRACT_ADDRESS_0, CID_0, CID_1,EVENTS_JSON_1, EVENTS_JSON_0, EVENTS_JSON_2, CID_2, MINT_PRICE, MAX_SUPPLY};
