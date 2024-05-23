import React, { useEffect, useState } from 'react'
import "./forms.css"
import { db, storage } from "../firebase/firebaseConfig"
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function AddJob(props) {

    const [jobTitle, setJobTitle] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const [fileName, setFiileName] = useState();
    const [currentRole, setCurrentRole] = useState("Front-Office-Work");
    const [url, setUrl] = useState();
    const [msg, setMsg] = useState();
    const [percent, setPercent] = useState(0);

    const [showBtn, setShowBtn] = useState(true);

    const [count, setCount] = useState(0)

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

    const handleAdd = async (e) => {
        const storageRef = ref(storage, `/job-role/${file?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    console.log("url", url)
                    setUrl(url)
                    if (url !== null) {
                        const allJobRef = collection(db, "All-Jobs-Data")
                        await addDoc(allJobRef,
                            {
                                imgUrl: url,
                                fileName: file?.name,
                                title: jobTitle,
                                description: description,
                                field: currentRole,
                            })
                            .then(() => {
                                console.log("added to database successfully")
                                setMsg("Upload Successfully")
                                setPercent(100)
                                if (percent === 100) {
                                    props.setShowAddJobForm(false)
                                    setShowBtn(false)
                                }
                            })
                    }
                     else {
                        console.log('error')
                    }
                })
            }
        )
    }

    const handleCancel = () => {
        props.setShowAddJobForm(false)
    }

    useEffect(() => {
        handleAdd();
    }, [count])

    return (
        <div className='form' >
            <div className='form-card' >
                <div>
                    <h2>Add Jobs</h2>
                </div>
                <div className='form-inputs' >
                    <input type='text' placeholder='Job Title' onChange={handleTitle} />
                    <textarea type='' placeholder='Job Description' onChange={handleDescription} style={{ width: "100%", padding: ".5rem", whiteSpace: 'pre-wrap', textAlign: 'center' }} />
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
                <div className="upload-bar">
                    <div className="bar" style={{ width: `${percent}%` }} ></div>
                </div>
                <h4 style={{ color: "green" }} >{msg}</h4>
                <div style={{ display: "flex", gap: "1.2rem" }}>
                    {
                        showBtn ?
                            <>
                                <button className='add-job-btn' onClick={() => setCount(count + 1)} >Add</button>
                                <button className='cancel-btn' onClick={handleCancel} >Cancel</button>
                            </>
                            :
                            <button className='cancel-btn' onClick={handleCancel} >Cancel</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddJob