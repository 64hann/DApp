import { useContext } from 'react'
import styled from 'styled-components'

import { ViewContext } from '../../context/ViewProvider'

const Wrap = styled.div`s
  margin-left: 30px;
  background-color: #161616;
  padding: 0em 0.8em;
  padding-top: 0.4em;
  border-radius: 10px;
  height: 2.6em;
  border: 2px solid #FFFFFF;
  p {
    color: #FFF;
  }
`

const DisplayAddress = () => {
  const { user } = useContext(ViewContext)
  const { address } = user
  const formatAddress = (addr) => {
    return `${addr.substr(0, 6)}...${addr.substr(-4)}`
  }

  return (
    <Wrap>
      <p>{formatAddress(address)}</p>
    </Wrap>
  )
}

export default DisplayAddress