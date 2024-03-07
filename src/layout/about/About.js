import React from 'react'
import "./about.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function About() {
  return (
    <div className='about_container' >
      <div className='box_one' >
        <h1>About <span>Lotus</span> Career Consulting</h1>
        <p>Welcome to Lotus Career Consulting, your one-stop shop for all things career-related. We're a team of passionate and experienced career professionals dedicated to helping you blossom in your professional life.</p>
        <p>Just like the lotus flower, which rises from murky waters to bloom into a symbol of purity and beauty, we believe everyone has the potential to achieve their career goals. Our mission is to provide you with the guidance, resources, and support you need to navigate the ever-changing job market and reach your full potential.</p>
        <Link to="/job" className='button'> Job Book <FontAwesomeIcon icon={faArrowRight} /></Link>
      </div>
      <div className='headings' >
        <h2>What We Offers </h2>
        <p>We offer a wide range of services to help you at every stage of your career journey, including</p>
      </div>
      <div className='about_card_container' >
        <div className='about_card' >
          <h3>Career Counseling</h3>
          <p>We'll help you identify your strengths, interests, and values, and develop a personalized career plan that aligns with your goals</p>
        </div>
        <div className='about_card' >
          <h3>Interview preparation</h3>
          <p>We'll provide you with the tips and tricks you need to ace your next job interview.</p>
        </div>
        <div className='about_card' >
          <h3>Job search strategies</h3>
          <p>We'll teach you how to effectively search for jobs, network with professionals, and land your dream job.</p>
        </div>
      </div>
    </div>
  )
}

export default About