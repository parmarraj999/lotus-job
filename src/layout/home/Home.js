import React from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Footer from '../footer/footer'

function Home() {


  return (
    <div className='home_container' >
      <h2>Apna Job Book</h2>
      <Link to="/job" className='button'> Explore Jobs <FontAwesomeIcon icon={faArrowRight} /></Link>
      <Footer/>
    </div>
  )
}

export default Home;