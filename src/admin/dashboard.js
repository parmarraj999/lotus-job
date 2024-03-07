import React, { useState } from 'react'
import "./dashboard.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {

  const auth = {
    username: "lotus",
    password: "lotus@123"
  }

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()

  const [hidePop, setHidePop] = useState(true);

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

  console.log(username, password)

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
        <Link to='/' className='exit-btn'>
          <FontAwesomeIcon icon={faRightFromBracket}/>
        </Link>
      </div>

    </div>
  )
}

export default Dashboard