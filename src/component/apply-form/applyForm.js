import React, { useState } from 'react'
import './applyForm.css'
import { faFacebook, faGoogle, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

function ApplyForm({ applyTitle, applyField, setShowApply ,imgUrl}) {

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [alternateNumber, setAlternateNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [imgLink,setImgLink] = useState(imgUrl)

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
      img_url:imgLink,
      name: name,
      number: number,
      alternateNumber: alternateNumber,
      email: email,
      address: address,
      jobTitle: applyTitle,
      jobField: applyField,
      date: date,
      time: currTime,
      queryDate : new Date()
    })
      .then(() => {
        setShowApply(false)
        console.log("data upload successfull")
      })
  }

  return (
    <div className='apply-form-container' >
      <div className='apply-card2' >
        <div className='card-section' >
          <img src='../../../images/logo.jpg' className='card-logo' />
          <h2>Apply for Job</h2>
          <div className='card-form' >
            <input type='text' className='input-form' placeholder='Name' onChange={handleName} />
            <div style={{ display: "flex", gap: "1.5rem" }} >
              <input type='text' placeholder='Number' className='input-form' onChange={handleNumber} />
              <input type='text' placeholder='Altenate Number' className='input-form' onChange={handleAlternateNumber} />
            </div>
            <input type='text' className='input-form' placeholder='Email (optional)' onChange={handleEmail} />
            <textarea type='text' className='input-form' placeholder='address' onChange={handleAddress} />
            <div className='tag-apply' >
              <h3 className=''>{applyField}</h3>
              <h3>{applyTitle}</h3>
            </div>
            <div className='btn-container' >
              <button onClick={handleApply}>Apply</button>
              <button className='cancel-btn' onClick={handleCancel} >Cancel</button>
            </div>
          </div>
          <div className='form-social-icon' >
            <a href='https://www.instagram.com/jabalpur_ki_job?utm_source=qr&igsh=MzNlNGNkZWQ4Mg%3D%3D' ><FontAwesomeIcon icon={faInstagram} /></a>
            <a href='https://www.facebook.com/Lotusjobconsultancy?mibextid=ZbWKwL' ><FontAwesomeIcon icon={faFacebook} /></a>
            <a href='https://youtube.com/@lotusjobconsultancy6424?si=oBezqHCxy5Qbt4pV' ><FontAwesomeIcon icon={faYoutube} /></a>
            <a href='https://g.co/kgs/3UkztZ1' ><FontAwesomeIcon icon={faGoogle} /></a>
          </div>
        </div>
        <div className='card-section img-work' >
          <img src='../../../../images/form-img.jpg' />
        </div>
      </div>
    </div>
  )
}

export default ApplyForm