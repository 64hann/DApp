const NFTButton = ({ text, onClick }) => {
  return (
    <button className="nft-button" onClick={onClick}>
      {text}
    </button>
  )
}

export { NFTButton }
