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
    const [currentRole, setCurrentRole] = useState("HR");

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
    const handleRole = (e) => {
        setCurrentRole(e.target.value);
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
            requestBy :currentRole, 
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
                <div className='card-section2' >
                    <img src='../../../images/logo.jpg' className='card-logo-2' />
                    <h2>Uplaod Jobs in Lotus</h2>
                    <div className='card-form' >
                        <input type='text' className='input-form' placeholder='Company Name' onChange={handleName} />
                        <input type='text' className='input-form' placeholder='Company Email' onChange={handleEmail} />
                        <input type='text' placeholder='Contact Number' className='input-form' onChange={handleNumber} />
                        <input type='text' className='input-form' placeholder='Job Title' onChange={handleJobTitle} />
                        <textarea type='text' className='input-form' placeholder='Job Description' onChange={handleDescription} />
                        <div className='field-selecter'>
                        <h4>Who Are You ?</h4>
                        <select onChange={handleRole} >
                            <option value="HR">HR</option>
                            <option value="Owner">Owner</option>
                        </select>
                    </div>
                        <div className='btn-container' >
                            <button className='addbtn' onClick={handleApply}>Apply</button>
                            <button className='cancel-btn2' onClick={handleCancel} >Cancel</button>
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