import React from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Home() {


  return (
    <div className='home_container' >
      <h2>Apna Job Book</h2>
      <div className='home-btn-container' >
        <Link to="/job" className='button'> Explore Jobs <FontAwesomeIcon icon={faArrowRight} /></Link>
        <a className='button' >Refference</a>
      </div>
      <button className='button' >Upload Your Job <FontAwesomeIcon icon={faArrowUp}/></button>
    </div>
  )
}

export default Home;