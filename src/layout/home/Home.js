import React from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Home() {


  return (
    <div className='home_container' >
      <h2>Consultancy</h2>
      <Link to="/job" className='button'> Job Book <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
  )
}

export default Home;