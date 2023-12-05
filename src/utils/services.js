import {
  CONTRACT_ADDRESS_0,
  CONTRACT_ADDRESS_1,
  CID_0,
  CID_1,
  CID_2,
  CONTRACT_ADDRESS_2,
} from "../constants/constants.js"

import {
  EVENTS_JSON_0,
  EVENTS_JSON_1,
  EVENTS_JSON_2,
} from "../constants/constants"

const ethers = require("ethers")
const contract = require("../artifacts/contracts/Nfticket.sol/Nfticket.json")

// const provider = new ethers.providers.Web3Provider(ethereum)
// const signer = provider.getSigner()

const listOfContracts = [
  new ethers.Contract(CONTRACT_ADDRESS_0, contract.abi, signer),
  new ethers.Contract(CONTRACT_ADDRESS_1, contract.abi, signer),
  new ethers.Contract(CONTRACT_ADDRESS_2, contract.abi, signer),
]

const listOfOptions = [
  {
    value: ethers.utils.parseUnits(
      (await listOfContracts[0].mintPrice()).toString(),
      0
    ),
    gasLimit: 500000,
  },
  {
    value: ethers.utils.parseUnits(
      (await listOfContracts[1].mintPrice()).toString(),
      0
    ),
    gasLimit: 500000,
  },
  {
    value: ethers.utils.parseUnits(
      (await listOfContracts[2].mintPrice()).toString(),
      0
    ),
    gasLimit: 500000,
  },
]

const States = {
  Loading: false,
  isError: false,
}

export { States, listOfContracts, listOfOptions }
