import React from 'react'
import "./footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='footer-container' >
      <div className='footer-wrapper'>
        <div className='footer-logo' >
          <img src="../../../images/logo.jpg" />
          <div className='social-links' >
            <a href='https://www.instagram.com/jabalpur_ki_job?utm_source=qr&igsh=MzNlNGNkZWQ4Mg%3D%3D' ><FontAwesomeIcon icon={faInstagram} /></a>
            <a href='https://www.facebook.com/Lotusjobconsultancy?mibextid=ZbWKwL' ><FontAwesomeIcon icon={faFacebook} /></a>
            <a href='https://youtube.com/@lotusjobconsultancy6424?si=oBezqHCxy5Qbt4pV' ><FontAwesomeIcon icon={faYoutube} /></a>
            <a href='https://g.co/kgs/3UkztZ1' ><FontAwesomeIcon icon={faGoogle} /></a>
          </div>
        </div>
        <div className='links-container' >
          <ul>
            <Link className='footer-link' to="/">Home</Link>
            <Link className='footer-link' to="/about">About</Link>
            <Link className='footer-link' to="/job">Job Book</Link>
            <Link className='footer-link' to="/photo">Gallary</Link>
            <Link className='footer-link' to="/">Branch</Link>
          </ul>
        <p style={{color:"grey"}} >Home Science College Road Aayush Gallery 1st floor Lotus office, Jabalpur, Madhya Pradesh 482002</p>
        </div>
        <div className='contacts'>
          <Link to="/contact" className='contact-btn'>Contact Us</Link>
          <h2>+91 7974811640</h2>
          <h2>+91 7000308062</h2>
        </div>
      </div>
      <div className='copyright' >
      All rights reserved © 2024
      </div>
    </div>
  )
}

export default Footer