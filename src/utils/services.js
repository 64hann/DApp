import {
  CONTRACT_ADDRESS_0,
  CONTRACT_ADDRESS_1,
  CONTRACT_ADDRESS_2,
} from "../constants/constants.js"

const ethers = require("ethers")
const contract = require("../artifacts/contracts/Nfticket.sol/Nfticket.json")

async function GetContracts() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (provider) {
      const signer = await provider.getSigner()
      const listOfContracts = [
        new ethers.Contract(CONTRACT_ADDRESS_0, contract.abi, signer),
        new ethers.Contract(CONTRACT_ADDRESS_1, contract.abi, signer),
        new ethers.Contract(CONTRACT_ADDRESS_2, contract.abi, signer),
      ]
      return listOfContracts
    }
  } catch (err) {
    console.error(err)
  }
}

async function GetOptions() {
  const listOfContracts = await GetContracts()

  try {
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
    return listOfOptions
  } catch (err) {
    console.log("User not logged in")
  }
}

const States = {
  Loading: false,
  isError: false,
}

export { States, GetContracts, GetOptions }
