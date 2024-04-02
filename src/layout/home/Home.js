import React, { useState } from 'react'
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import CompanyJobForm from '../../component/companyJob/companyJobForm'

function Home() {

  const [ showCompanyJobForm, setShowCompanyJobForm] = useState(false)

  return (
    <div className='home_container' >
      <h2>Apna Job Book</h2>
      <div className='home-btn-container' >
        <Link to="/job" className='button'> Explore Jobs <FontAwesomeIcon icon={faArrowRight} /></Link>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSeqqWIyRzvIpPTsdzwpLFZ5HXwdBIKaUCNs7gJs8iXlmq1M9g/viewform' className='button' >Refference</a>
      </div>
      <button className='button' onClick={()=>setShowCompanyJobForm(true)} >Upload Your Job <FontAwesomeIcon icon={faArrowUp}/></button>
      {
        showCompanyJobForm ? <CompanyJobForm setShowCompanyJobForm={setShowCompanyJobForm} /> :""
      }
    </div>
  )
}

export default Home;