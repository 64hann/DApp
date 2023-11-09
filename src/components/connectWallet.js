import { useEffect, useState } from "react"

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
    getCurrentWalletConnected()
    addWalletListener()
  }, [walletAddress])

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        // MetaMask is installed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletAddress(accounts[0])
        console.log(accounts[0])
      } catch (err) {
        console.error(err.message)
      }
    } else {
      // MetaMask is not installed
      console.log("Please install MetaMask")
    }
  }

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          console.log(accounts[0])
        } else {
          console.log("Connect to MetaMask using the Connect button")
        }
      } catch (err) {
        console.error(err.message)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0])
        console.log(accounts[0])
      })
    } else {
      setWalletAddress("")
      console.log("Please install MetaMask")
    }
  }

  return (
    <html>
      <head>
        <title>Welcome</title>
      </head>
      <body>
        <h1>Welcome</h1>

        <button id="connectButton" onClick={connectWallet}>
          <span>
            {walletAddress && walletAddress.length > 0
              ? `Connected: ${walletAddress.substring(
                  0,
                  5
                )}...${walletAddress.substring(38)}`
              : "Connect Wallet"}
          </span>
        </button>
      </body>
    </html>
  )
}

export { ConnectWallet }
