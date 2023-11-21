const ConnectWalletButton = ({ children, handleClick = null, loggedIn }) => {
  const cs = loggedIn ? "logged-in-button" : "connect-wallet-button"
  return (
    <button className={cs} onClick={handleClick}>
      {children}
    </button>
  )
}

export default ConnectWalletButton
