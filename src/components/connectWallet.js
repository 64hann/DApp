import Button from "./extras/Button"
import styled from 'styled-components'

// Button = styled.div`s
// background-color: #161616;
// padding: 0em 0.8em;
// padding-top: 0.4em;
// border-radius: 10px;
// height: 2.6em;
// border: 2px solid #FFFFFF;
// p {
//   color: #FFF;
// }
// `

const ConnectWallet2 = ({ connect }) => {
  return (
    <Button handleClick={connect}>
      <p>Connect Wallet</p>
    </Button>
  )
}

export default ConnectWallet2