import React, { useState } from 'react'
import "./dashboard.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import RecentJob from './recent-job/RecentJob';
import AddJob from '../component/AddJob';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Upload from '../function/upload/upload';
import RecentPhoto from './recent-photo/recentPhoto';
import RecentApply from './recent-apply/recentApply';


function Dashboard() {

  const auth = {
    username: "lotus",
    password: "lotus@123"
  }

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()

  const [hidePop, setHidePop] = useState(false);//set true before host
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className='dashboard-container' >
      {/* ----- pop up -----  */}
      {
        hidePop ?
          <div className='auth-popup' >
            <div className='pop-card' >
              <h1>Log In</h1>
              <input type='text' placeholder='Enter Username' value={username} onChange={handleUsername} />
              <input type='password' placeholder='Enter Password' value={password} onChange={handlePassword} />
              <p>{error}</p>
              <button onClick={handleLogin}>Log In</button>
            </div>
          </div>
          : ""
      }
      <div className='dashboard-header' >
        <h2>lotus dashboard</h2>
        <Link to='' className='exit-btn' onClick={() => setHidePop(true)}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
      <div className='dashboard-main' >
        <div className='applied-list' >
          <RecentApply/>
        </div>
        <div className='post-job-container' >
          <div>
            <button className='add-job-btn' onClick={() => setShowAddJobForm(true)} >Add Job</button>
          </div>
          <RecentJob />
        </div>
        <div className='photo-upload-container'>
          <div className='header-photos' >
            <button className='add-button'>
              Add Photo
            </button>
          </div>
            <RecentPhoto/>
        </div>
      </div>
      {
        showAddJobForm ? <AddJob setShowAddJobForm={setShowAddJobForm} /> : ""
      }
      {
        showForm ?
          <Upload setShowForm={setShowForm} /> : ""
      }
    </div>
  )
}

export default Dashboard