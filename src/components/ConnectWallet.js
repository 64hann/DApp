const ConnectWalletButton = ({ children, handleClick = null, loggedIn }) => {
  const cs = loggedIn ? "logged-in-button" : "connect-wallet-button"
  return (
    <button className={cs} onClick={handleClick}>
      {children}
    </button>
  )
}

const ConnectWallet = ({ connect, text, loggedIn }) => {
  return (
    <ConnectWalletButton handleClick={connect} loggedIn={loggedIn}>
      {text}
    </ConnectWalletButton>
  )
}

export default ConnectWallet
