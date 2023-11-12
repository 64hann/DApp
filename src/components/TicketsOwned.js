/* Imports and Style Definitions */
import { useState, useEffect, useContext } from 'react'
import { ViewContext } from '../context/ViewProvider'


const TicketsOwned = () => {
  /* Top Level Code */
  //To be implemented 
  const ownedTickets = ["hello!", "hi!"];

  return (
    <div>
      <hr height="1" />
      { ownedTickets.length > 0
        ? <>
            <div>You have {ownedTickets.length} ticket{ownedTickets.length > 1 ? 's' : ''}!</div>
          </>
        : null
      }
    </div>
  )
}

export default TicketsOwned