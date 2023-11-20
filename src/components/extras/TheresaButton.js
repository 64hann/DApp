import "./button.css"

const TheresaButton = ({ children, handleClick = null }) => {
  return (
    <button className="theresa-button" onClick={handleClick}>
      {children}
    </button>
  )
}

export default TheresaButton
