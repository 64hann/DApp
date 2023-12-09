// import {CID_0} from "../../../src/constants/constants.js";

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const JWT =
"ENTER YOUR JWT HERE";

const CID_0 = "QmX2QHBG8x2bq8Sok8kRte9r8g4aYDn8pbk27SL63m7TnZ";
const CID_1 = "QmTJjcZWpJ9LKkymKtQdnytRqLAAG6DXq2qjTnodSR7wYt";
const CID_2 = "QmQ3dn4aABbcV2NDYQkQ15yUA5ryTWKyyjEPAKy6Hn1vm6";


export const fetchIPFSData = async (cid) => {
  try {
const URL = "https://white-official-egret-905.mypinata.cloud/ipfs/" + cid;
console.log(URL)
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// CALL fetchIPFSData to get data from IPFS

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "eventData2.json";

  const file = fs.createReadStream(src);
  formData.append("file", file);
  const pinataMetadata = JSON.stringify({
    name: "NFTickets",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// pinFileToIPFS();
