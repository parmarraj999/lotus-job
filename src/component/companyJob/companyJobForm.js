import React, { useState } from 'react'
import './companyJobForm.css'
import { faFacebook, faGoogle, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';


function CompanyJobForm({ setShowCompanyJobForm }) {

    const [name, setName] = useState();
    const [number, setNumber] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [email, setEmail] = useState();
    const [jobDescription, setJobDescription] = useState();

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleNumber = (e) => {
        setNumber(e.target.value)

    }
    const handleJobTitle = (e) => {
        setJobTitle(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleDescription = (e) => {
        setJobDescription(e.target.value)
    }

    const handleCancel = () => {
        setShowCompanyJobForm(false)
    }


    const dateVar = new Date();
    const date = dateVar.toDateString();
    const currTime = new Date().toLocaleTimeString();
    console.log(currTime)
    const handleApply = async (e) => {
        e.preventDefault();
        const applyDataRef = collection(db, "company-job-Data")
        await addDoc(applyDataRef, {
            name: name,
            email: email,
            number: number,
            jobTitle: jobTitle,
            description: jobDescription,
            date: date,
            time: currTime
        })
            .then(() => {
                setShowCompanyJobForm(false)
                console.log("data upload successfull")
            })
    }


    return (
        <div className='apply-form-container' >
            <div className='apply-card2' >
                <div className='card-section' >
                    <img src='../../../images/logo.jpg' className='card-logo' />
                    <h2>Uplaod Jobs in Lotus</h2>
                    <div className='card-form' >
                        <input type='text' className='input-form' placeholder='Company Name' onChange={handleName} />
                        <input type='text' className='input-form' placeholder='Company Email' onChange={handleEmail} />
                        <input type='text' placeholder='Contact Number' className='input-form' onChange={handleNumber} />
                        <input type='text' className='input-form' placeholder='Job Title' onChange={handleJobTitle} />
                        <textarea type='text' className='input-form' placeholder='Job Description' onChange={handleDescription} />
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

export default CompanyJobForm