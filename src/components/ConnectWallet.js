import ConnectWalletButton from "./extras/ConnectWalletButton"

const ConnectWallet = ({ connect, text, loggedIn }) => {
  return (
    <ConnectWalletButton handleClick={connect} loggedIn={loggedIn}>
      {text}
    </ConnectWalletButton>
  )
}

export default ConnectWallet
