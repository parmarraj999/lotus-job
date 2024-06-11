import React from 'react'
import "./sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function Sidebar({setShowSide,data}) {

  return (
    <div className='side-bar-container' >
      <div className='side-bar' >
        <div className='side-bar-header' >
          <h2>Details</h2>
          <div className='close-icon' onClick={()=>setShowSide(false)} >
            <FontAwesomeIcon icon={faClose}/>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Sidebar