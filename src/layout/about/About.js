import React from 'react'
import "./about.css"
import { gsap } from 'gsap/gsap-core'
import Footer from '../footer/footer'
import { useGSAP } from '@gsap/react'

function About() {

  useGSAP(() => {
    gsap.from(".slide-box2", {
      x: -200,
      
    })
    gsap.from(".slide-box", {
      x: 200,
      
    })
    gsap.from(".intro-box",{
      opacity:0,
      duration:1.2,
    })
    gsap.from(".intro-box > .about-tag",{
      y:-20,
      opacity:0,
      duration:.3,
      delay:1.2
    })
    gsap.from(".intro-box > h1",{
      y:-20,
      opacity:0,
      duration:.3,
      delay:1.4
    })
    gsap.from(".intro-box > p",{
      y:-20,
      opacity:0,
      duration:.3,
      delay:1.6
    })
    gsap.from(".we-box > h2",{
      y:-20,
      opacity:0,
      duration:.3,
      delay:1.8
    })
    gsap.from(".we-box > p",{
      y:-20,
      opacity:0,
      duration:.3,
      delay:2
    })
    gsap.from(".we-box > .hand-two",{
      x:-20,
      opacity:0,
      duration:.3,
      delay:2
    })
    gsap.from(".we-box > .hand-one",{
      x:20,
      opacity:0,
      duration:.3,
      delay:2
    })
    console.log(window.innerWidth )
   
  })
  return (
    <>
      {/* <Footer /> */}
      <div className='about-container' >
        <div className='intro-box' >
          <div className='about-tag' >
            About us
          </div>
          <h1>Introduction</h1>
          <p>Company Profile Lotus job consultancy in Jabalpur has been providing its services to the private companies of Jabalpur since last year 2018, which is absolutely free. We do not charge anything from the private companies and our endeavor is to provide good employees to the companies of Jabalpur. Can be appointed and that company and the youth of Jabalpur continue to get employment opportunities.</p>
        </div>
        <div className='we-box' >
          <h2>How We Work !</h2>
          <p>Whatever related job details are given by the company, we will share it on our website www.apnajobbook.com.
            I post it and then after that, we take the first interview of all the candidates who apply for the post so that we can give you a better candidate. When we feel that the candidate is of high quality for your company, only then we We send him his resume to you through mail and WhatsApp and when you call him for the final interview or first round interview, we send him to your office as per the time given by you.
            Due to which your work becomes easier regarding the hiring process which saves your time.</p>
          <img src='../../../../images/hand-1.png' className='hand-one' />
          <img src='../../../../images/hand-2.png' className='hand-two' />
        </div>
        <div className='boss-section' >
          <div className='boss-wrapper' >
            <div className='slide-box' >
              <div className='about-tag' >Ceo & Director</div>
              <div style={{display:"flex",flexDirection:"column", alignItems:"center",gap:".8rem"}}>
                <h1>Mr. Shubhank  Saini</h1>
                <p>With a passion for empowering others, Mr. Shubhank Saini founded Lotus Group to guide companies through complex challenges.</p>
              </div>
            </div>
            <div className='slide-box2' >
              <img src='../../../../images/shubhank-2.jpg' />
            </div>
          </div>
        </div>
        <div className='services-section' >
            <h1>Job Fields </h1>
            <div className='service-tags' >
              <div className='tag'>telecaller</div>
              <div className='tag'>data operator</div>
              <div className='tag'>computer operator</div>
              <div className='tag'>Office Assistant</div>
              <div className='tag'>operation post</div>
              <div className='tag'>manager</div>
              <div className='tag'>accountant</div>
              <div className='tag'>supervisor</div>
              <div className='tag'>floor in charge</div>
              <div className='tag'>hr</div>
              <div className='tag'>Sales executive</div>
              <div className='tag'>sales manager</div>
              <div className='tag'>mechanical engineer</div>
              <div className='tag'>civil engineer</div>
              <div className='tag'>ITI related employees</div>
              <div className='tag'>diploma related staff</div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default About