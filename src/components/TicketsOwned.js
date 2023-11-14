import { useState, useEffect, useContext } from 'react'
import { ViewContext } from '../context/ViewProvider'


const TicketsOwned = () => {
  //To be implemented 
  const ownedTickets = ["hello!", "hi!"];

  return (
    <div>
      <hr height="1" />
      { ownedTickets.length > 0
        ? <>
            <div style={{color:"white"}}>You have {ownedTickets.length} ticket{ownedTickets.length > 1 ? 's' : ''}!</div>
          </>
        : null
      }
    </div>
  )
}

export default TicketsOwned