import React, { useState } from 'react'
import "./forms.css"
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function Apply({ applyTitle, applyField, setShowApply }) {

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [alternateNumber, setAlternateNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleNumber = (e) => {
    setNumber(e.target.value)
  }
  const handleAlternateNumber = (e) => {
    setAlternateNumber(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleCancel = () => {
    setShowApply(false)
  }

  const dateVar = new Date();
  const date = dateVar.toDateString();
  const currTime = new Date().toLocaleTimeString();
  console.log(currTime)
  const handleApply = async (e) => {
    e.preventDefault();
    const applyDataRef = collection(db, "Apply-Data")
    await addDoc(applyDataRef, {
      name: name,
      number: number,
      alternateNumber: alternateNumber,
      email: email,
      address: address,
      jobTitle: applyTitle,
      jobField: applyField,
      date:date,
      time:currTime
    })
    .then(()=>{
      setShowApply(false)
      console.log("data upload successfull")
    })
  }

  return (
    <div className='form' >
      <div className='form-card' >
        <div>
          <h2>Apply to Job</h2>
        </div>
        <div className='form-inputs' >
          <input type='text' placeholder='Name' onChange={handleName} />
          <input type='text' placeholder='Phone Number' onChange={handleNumber} />
          <input type='text' placeholder='Alternate Number' onChange={handleAlternateNumber} />
          <input type='text' placeholder='Address' onChange={handleAddress} />
          <input type='email' placeholder='Email (optional)' onChange={handleEmail} />
          <div className='pre-details' >
            <div>{applyTitle}</div>
            <div>{applyField}</div>
          </div>
          <div className='pre-details' >
            <button className='add-job-btn' style={{ width: "100%" }} onClick={handleApply} >Apply</button>
            <button className='cancel-btn' style={{ width: "100%" }} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apply