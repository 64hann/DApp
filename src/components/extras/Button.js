import "./button.css"

const Button = ({ children, handleClick = null }) => {
  return (
    <button class="button" onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button