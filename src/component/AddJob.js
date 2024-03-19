import React, { useState } from 'react'
import "./forms.css"
import { db, storage } from "../firebase/firebaseConfig"
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


function AddJob(props) {

    const [jobTitle, setJobTitle] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const [fileName, setFiileName] = useState();
    const [currentRole, setCurrentRole] = useState("Front-Office-Work");
    const [url, setUrl] = useState();
    const [msg, setMsg] = useState();

    const handleTitle = (e) => {
        setJobTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleRole = (e) => {
        setCurrentRole(e.target.value);
    }

    const data = {
        title: jobTitle,
        description: description,
        file: url
    }

    // console.log(data)
    const handleAdd = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `/job-role/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    console.log("url", url)
                    setUrl(url)
                    if (url !== null) {
                        // const collectionRef = collection(db, `${currentRole}`)
                        // await addDoc(collectionRef, { imgUrl: url, title: jobTitle, description: description })
                        const allJobRef = collection(db, "All-Jobs-Data")
                        await addDoc(allJobRef,
                            {
                                imgUrl: url,
                                title: jobTitle,
                                description: description,
                                field: currentRole,
                            })
                        console.log("added to database")
                        setMsg("Upload Successfully")
                        console.log('successfull')
                    } else {
                        console.log('error')
                    }
                })
                if (msg === "Upload Successfully") {
                    setTimeout(() => {
                        props.setShowAddJobForm(false)
                    }, 3000)
                }
            }
        )
    }

    const handleCancel = () => {
        props.setShowAddJobForm(false)
    }

    return (
        <div className='form' >
            <div className='form-card' >
                <div>
                    <h2>Add Jobs</h2>
                </div>
                <div className='form-inputs' >
                    <input type='text' placeholder='Job Title' onChange={handleTitle} />
                    <input type='' placeholder='Job Description' onChange={handleDescription} />
                    <input type='file' onChange={handleFile} />
                    <div className='field-selecter'>
                        <h4>Choose Field</h4>
                        <select onChange={handleRole}>
                            <option value="Front-Office-Work">Front Office Work</option>
                            <option value="Back-Office-Work">Back Office Work</option>
                            <option value="Banking Sector">banking Sector</option>
                            <option value="Medical">Medical</option>
                            <option value="Marketing Fields"> Marketing</option>
                            <option value="Micro Finance"> Micro Finance</option>
                            <option value="Stock Marketing"> Stock Marketing</option>
                        </select>
                    </div>
                </div>
                <h4 style={{ color: "green" }} >{msg}</h4>
                <div style={{ display: "flex", gap: "1.2rem" }}>
                    <button className='add-job-btn' onClick={handleAdd} >Add</button>
                    <button className='cancel-btn' onClick={handleCancel} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddJob