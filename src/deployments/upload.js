const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZTAxM2RmMC1jZWVlLTQzMzMtYTQ0My1jNzFmYmRiNThiNTEiLCJlbWFpbCI6IndlaWd1YW5nX2hhbkBteW1haWwuc3V0ZC5lZHUuc2ciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjNkNjRlNzg5MjQ5NGFiMTc1YjAiLCJzY29wZWRLZXlTZWNyZXQiOiJjNTMzZTIxNWEzMjc1ZDUzNmFlNTI5YzFjMmI0ZDM0MjM1NzdiODU3N2JjYzI1ZDQxNmFkM2UwYWEwMGVjZTc4IiwiaWF0IjoxNzAwMzE0MDk3fQ.8bEOTt9XOPwMqnq5mT-f-cqkuTjXJNy0iCRmqHzqLo0";

const URL =
  "https://white-official-egret-905.mypinata.cloud/ipfs/QmQwPA25ZiKhS1qQ7Z8XwhkjWA5AVFNE2mVan75Ty15yWU"


export const fetchIPFSData = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// CALL fetchIPFSData to get data from IPFS

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "testEvents.json";

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

const CID = "QmQwPA25ZiKhS1qQ7Z8XwhkjWA5AVFNE2mVan75Ty15yWU";


// pinFileToIPFS();