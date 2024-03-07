import React, { useState } from 'react'
import "./nav.css"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'

function Nav() {

  const [close, setClose] = useState(true)

  const openNav = () => {
    setClose(false)
  }
  const closeNav = () => {
    setClose(true)
  }

  return (
    <div className='nav_container'>
      <div className='logo_container'>
        <img src='../../images/logo.jpg' alt='pic' />
      </div>
      <ul>
        <NavLink className="nav_link" to="/">Home</NavLink>
        <NavLink className="nav_link" to="/about" >About</NavLink>
        <NavLink className="nav_link" to="/job" >Job Book</NavLink>
        <NavLink className="nav_link" to="/photo" >Photo</NavLink>
      </ul>
      <div className='menu_icon'>
        {
          close ?
            <div onClick={openNav} >
              <FontAwesomeIcon icon={faBars} />
            </div>
            :
            <div onClick={closeNav} >
              <FontAwesomeIcon icon={faClose} />
            </div>
        }
      </div>
      {
        close ? "" :
          <div className='mobile_menu' >
            <NavLink className="nav_link" to="/" onClick={closeNav}>Home</NavLink>
            <NavLink className="nav_link" to="/about" onClick={closeNav}>About</NavLink>
            <NavLink className="nav_link" to="/job" onClick={closeNav}>Job Book</NavLink>
            <NavLink className="nav_link" to="/photo" onClick={closeNav}>Photo</NavLink>
          </div>
      }
    </div>
  )
}

export default Nav