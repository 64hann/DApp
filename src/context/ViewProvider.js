import { createContext, useEffect, useCallback } from "react"
import { initialState } from "./initialState.js"
import { reducer } from "../reducers"

/* Additional Imports */
import { useImmerReducer } from "use-immer"
import { ethers } from "ethers"

export const ViewContext = createContext(initialState)

/* Num Format Utilities */
// Get ETH as small number ("0.01" => "10000000000000000")
export const bigNumberify = (amt) => ethers.utils.parseEther(amt)

// Get ETH as small number ("10000000000000000" => "0.01")
export const smolNumberify = (amt, decimals = 18) =>
  parseFloat(ethers.utils.formatUnits(amt, decimals))

export const ViewProvider = ({ children }) => {
  /* Top Level Code */
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const setAccount = useCallback(async (accounts) => {
    /* setAccount callback */
    if (accounts.length > 0) {
      try {
        const connectedAccount = {
          address: accounts[0],
        }
        dispatch({ type: "SET_ACCOUNT", payload: connectedAccount })
      } catch (e) {
        console.error(e)
      }
    } else {
      dispatch({ type: "SET_ACCOUNT", payload: initialState.user })
    }
  }, [])

  const connectUser = useCallback(async () => {
    /* connectUser callback */
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      if (provider) {
        const signer = await provider.getSigner()
        const { name, chainId } = await provider.getNetwork()
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        })

        setAccount(accounts)
        dispatch({
          type: "CONNECTED_PROVIDER",
          payload: {
            provider,
            signer,
            chainId,
            name,
          },
        })
      }
    } catch (e) {
      console.error(e)
      console.log("provider error")
    }
  }, [])

  useEffect(() => {
    /* connectUser Effect */
    if (window.ethereum) {
      connectUser()
      window.ethereum.on("accountsChanged", () => {
        connectUser()
      })
      window.ethereum.on("chainChanged", () => {
        connectUser()
      })
      window.ethereum.on("disconnect", () => {
        dispatch({ type: "SET_ACCOUNT", payload: initialState.user })
      })
    }
  }, [])

  /* Destructure State */
  const { isConnected, signer, name, chainId, provider, user } = state

  /* connect function */
  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccount(accounts)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ViewContext.Provider
      value={{
        /* Provider State Values */
        state,
        dispatch,
        isConnected,
        provider,
        signer,
        user,
        name,
        chainId,
        actions: { connect },
        bigNumberify,
        smolNumberify,
      }}
    >
      {children}
    </ViewContext.Provider>
  )
}
