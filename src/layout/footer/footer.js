import React from 'react'
import "./footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
function Footer() {
  return (
    <div className='footer-container' >
      <div>
        <a href='' >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href='' >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div>
        <h3>7974477472</h3>
        <h3>9407006613</h3>
      </div>
    </div>
  )
}

export default Footer