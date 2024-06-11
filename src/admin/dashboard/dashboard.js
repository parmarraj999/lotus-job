import React, { useState } from 'react'
import "./dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import AddJob from '../../component/AddJob'
import Upload from '../../function/upload/upload'
import VideoUpload from '../../function/upload/VideoUpload'
import gsap from 'gsap'

function Dashboard() {

  const auth = {
    username: "lotus administration",
    password: "lotus@123"
  }

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()

  const [hidePop, setHidePop] = useState(false);//set true before deploy
  const [showAddJobForm, setShowAddJobForm] = useState(false);//add jobs form
  const [showForm, setShowForm] = useState(false);//add photo form
  const [showVideoForm, setShowVideoForm] = useState(false)

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    if (username === auth.username && password === auth.password) {
      setHidePop(false)
    } else {
      setError("Username and Password not Match")
      setPassword("")
      setUsername("")
    }
  }

  const [showBtn, setShowBtn] = useState("job-btn")
  const [mini, setMini] = useState("")

  const tl = gsap.timeline();

  const handleMinimize = () => {
    setMini("minimize")
    // gsap.to(".side-nav", {
    //   width: "0%",
    //   padding: "0",
    //   height: "80px",
    //   delay:1
    // })
    gsap.to(".main-block", {
      width: "100%"
    })
    // gsap.to(".side-logo > img", {
    //   width: "80px",
    //   height: "80px"
    // })
    gsap.to(".navlink-sidenav",{
      y:-20,
      opacity:0,
      duration:.3,
      stagger:.1
    })
    tl.to(".side-nav",{
      height:0,
      padding:0,
      delay:1,
      duration:.6
    })
    tl.to(".side-nav",{
      width:0,
    })
  }

  const handleMaximize = () => {
    setMini("")
    tl.to(".side-nav",{
      width:"20%",
    })
    tl.to(".side-nav",{
      height:"100%",
      padding:"1rem",
      duration:.6
    })
    gsap.to(".navlink-sidenav",{
      y:0,
      opacity:1,
      delay:1,
      duration:.3,
      stagger:.1
    })
  }

  return (
    <>
      {
        hidePop ?
          <div className='auth-popup' >
            <div className='pop-card' >
              <h1>Log In</h1>
              <input type='text' placeholder='Enter Username' value={username} onChange={handleUsername} />
              <input type='password' placeholder='Enter Password' value={password} onChange={handlePassword} />
              <p>{error}</p>
              <div style={{ display: "flex", gap: "1.2rem", width: "100%" }}>
                <button onClick={handleLogin} style={{ width: "100%" }}>Log In</button>
                <Link style={{ width: "100%", background: "grey", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "black", borderRadius: "2rem" }} to="/">Back</Link>
              </div>
            </div>
          </div>
          :
          <div className='dashboard-container-two' >
            <div className='side-nav' >
              <div className='side-logo' onClick={handleMinimize}>
                <img src='../../../images/logo.jpg' />
              </div>
              <ul>
                <NavLink className="navlink-sidenav" to='recent-job' onClick={() => setShowBtn("job-btn")}>Recent Job</NavLink>
                <NavLink className="navlink-sidenav" to='recent-apply' onClick={() => setShowBtn("")}>Recent apply</NavLink>
                <NavLink className="navlink-sidenav" to='recent-photo' onClick={() => setShowBtn("photo-btn")}>Recent photo</NavLink>
                <NavLink className="navlink-sidenav" to='recent-video' onClick={() => setShowBtn("video-btn")}>Recent Video</NavLink>
                <NavLink className="navlink-sidenav" to='recent-uploads' onClick={() => setShowBtn("")}>Recent upload</NavLink>
              </ul>
            </div>
            <div className='main-block' >
              <div className='main-header' >
                <h2>Lotus Dashboard</h2>
                <div className='header-btn' >
                  {
                    showBtn === "job-btn" ?
                      <div className='addBtn'>
                        <button className='add-job-btn' onClick={() => setShowAddJobForm(true)} >Add Job</button>
                      </div>
                      : ""
                  }
                  {
                    showBtn === "video-btn" ?
                      <div className='addBtn'>
                        <button className='add-job-btn' onClick={() => setShowVideoForm(true)} >Add Video</button>
                      </div>
                      : ""
                  }
                  {
                    showBtn === "photo-btn" ?
                      <button className='add-photo-button' onClick={() => setShowForm(true)}> Add Photo</button>
                      : ""
                  }
                  <div className='exit-icon' >
                    <FontAwesomeIcon icon={faRightFromBracket} onClick={() => setHidePop(true)} />
                  </div>
                </div>
              </div>
              <div className='main-section-container'>
                <Outlet />
              </div>
            </div>

            {/* // add photo form  */}
            {
              showForm ?
                <Upload setShowForm={setShowForm} /> : ""
            }
            {/* // add job form  */}
            {
              showAddJobForm ? <AddJob setShowAddJobForm={setShowAddJobForm} /> : ""
            }
            {/* // video upload form  */}
            {
              showVideoForm ? <VideoUpload setShowVideoForm={setShowVideoForm} /> : ""
            }
            {
              mini === "minimize" ?
            <button className='minimize-btn' onClick={handleMaximize}>
              <FontAwesomeIcon icon={faArrowRight}/>
            </button> : 
            <button className='minimize-btn' onClick={handleMinimize}>
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
            }
          </div>
      }

    </>
  )
}

export default Dashboard