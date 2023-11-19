import TheresaButton from "./extras/TheresaButton" //can we change this?

const ConnectWallet = ({ connect }) => {
  return <TheresaButton handleClick={connect}>Connect Wallet</TheresaButton>
}

export default ConnectWallet
