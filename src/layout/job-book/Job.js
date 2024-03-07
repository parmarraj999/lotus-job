import React, { useState } from 'react'
import "./job.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faBars } from '@fortawesome/fontawesome-free-solid'
import BackOffice from './role/BackOffice'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import FrontOffice from './role/FrontOffice'
import Banking from './role/Banking'
import Medical from './role/Medical'
import Marketing from './role/Marketing'

function Job() {

  const [role, setRole] = useState("backOffice");
  const [menuOpen, SetMenuOpen] = useState(false);

  function handleRole(role) {
    setRole(role)
    SetMenuOpen(false)
  }

  return (
    <div className='job-container' >
      <div className='nav' >
        <Link to='/' className='back-btn' >
          <FontAwesomeIcon icon={faArrowLeft} />Back
        </Link>
        <hr style={{ marginTop: "1rem" }} ></hr>
        <div className='menu-container' >
          <ul>
            <li className='menu-item' onClick={() => handleRole("frontOffice")} >Front Office Work <FontAwesomeIcon icon={faArrowRight} /> </li>
            <li className='menu-item' onClick={() => handleRole("backOffice")} >Back Office Work <FontAwesomeIcon icon={faArrowRight} /></li>
            <li className='menu-item' onClick={() => handleRole("banking")} >Banking Sector <FontAwesomeIcon icon={faArrowRight} /></li>
            <li className='menu-item' onClick={() => handleRole("medical")} >Medical <FontAwesomeIcon icon={faArrowRight} /></li>
            <li className='menu-item' onClick={() => handleRole("marketing")} >Marketing Field <FontAwesomeIcon icon={faArrowRight} /></li>
          </ul>
        </div>
      </div>
      <div className='main-container' >
        <div className='header-main-container' >
          <h1>Job Roles</h1>
        </div>
        {
          role === "backOffice" ?
            <BackOffice />
            :
            ""
        }
        {
          role === "frontOffice" ?
            <FrontOffice />
            :
            ""
        }
        {
          role === "banking" ?
            <Banking />
            :
            ""
        }
        {
          role === "medical" ?
            <Medical />
            :
            ""
        }
        {
          role === "marketing" ?
            <Marketing />
            :
            ""
        }
      </div>
      <div className='mobile-job-nav'>
        <Link to='/' className='back-btn' style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div>
          {
            menuOpen ?
              <div className='back-btn' onClick={() => SetMenuOpen(false)} style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center", background: "black", color: "white" }} >
                <FontAwesomeIcon icon={faClose} />
              </div>
              :
              <div className='back-btn' onClick={() => SetMenuOpen(true)} style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center", background: "black", color: "white" }} >
                <FontAwesomeIcon icon={faBars} />
              </div>
          }
          {
            menuOpen ?
              <div className='mobile-job-nav-menu'>
                <div className='menu-container' >
                  <ul>
                    <li className='menu-item' onClick={() => handleRole("frontOffice")} >Front Office Work <FontAwesomeIcon icon={faArrowRight} /> </li>
                    <li className='menu-item' onClick={() => handleRole("backOffice")} >Back Office Work <FontAwesomeIcon icon={faArrowRight} /></li>
                    <li className='menu-item' onClick={() => handleRole("banking")} >Banking Sector <FontAwesomeIcon icon={faArrowRight} /></li>
                    <li className='menu-item' onClick={() => handleRole("medical")} >Medical <FontAwesomeIcon icon={faArrowRight} /></li>
                    <li className='menu-item' onClick={() => handleRole("marketing")} >Marketing Field <FontAwesomeIcon icon={faArrowRight} /></li>
                  </ul>
                </div>
              </div>
              : ""
          }
        </div>
      </div>
    </div>
  )
}

export default Job