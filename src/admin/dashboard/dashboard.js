import React, { useState } from 'react'
import "./dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import AddJob from '../../component/AddJob'
import Upload from '../../function/upload/upload'

function Dashboard() {

  const auth = {
    username: "lotus",
    password: "lotus@123"
  }

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()

  const [hidePop, setHidePop] = useState(false);//set true before host
  const [showAddJobForm, setShowAddJobForm] = useState(false);//add jobs form
  const [showForm, setShowForm] = useState(false);//add photo form

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

  const [showBtn, setShowBtn] = useState("")

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
              <div className='side-logo'>
                <img src='../../../images/logo.jpg' />
              </div>
              <ul>
                <NavLink className="navlink-sidenav" to='recent-job'  onClick={()=>setShowBtn("job-btn")}>Recent Job</NavLink>
                <NavLink className="navlink-sidenav" to='recent-apply'  onClick={()=>setShowBtn("")}>Recent apply</NavLink>
                <NavLink className="navlink-sidenav" to='recent-photo'  onClick={()=>setShowBtn("photo-btn")}>Recent photo</NavLink>
                <NavLink className="navlink-sidenav" to='recent-uploads' onClick={()=>setShowBtn("")}>Recent upload</NavLink>
              </ul>
            </div>
            <div className='main-block' >
              <div className='main-header' >
                <h2>Welcome back, Team</h2>
                <div className='header-btn' >
                  {
                    showBtn === "job-btn" ?
                      <div className='addBtn'>
                        <button className='add-job-btn' onClick={() => setShowAddJobForm(true)} >Add Job</button>
                      </div>
                      : ""
                  }
                  {
                    showBtn === "photo-btn" ?
                      <button className='add-photo-button' onClick={()=> setShowForm(true)}> Add Photo</button>
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
          </div>
      }
    </>
  )
}

export default Dashboard