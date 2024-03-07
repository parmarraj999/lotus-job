import React, { useState } from 'react'
import "./forms.css"

function AddJob(props) {

    const [jobTitle,setJobTitle] = useState();
    const [description,setDescription] = useState();
    const [file,setFile] = useState();

    const handleTitle = (e) => {
        setJobTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleFile = (e)=>{
        setFile(e.target.files[0])
    }

    const data = {
        title : jobTitle,
        description : description,
        file : file
    }

    console.log(data)

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
                    <input type='text' placeholder='Job Title' onChange={handleTitle}/>
                    <input type='' placeholder='Job Description' onChange={handleDescription} />
                    <input type='file' onChange={handleFile}/>
                </div>
                <div style={{display:"flex",gap:"1.2rem"}}>
                    <button className='add-job-btn' >Add</button>
                    <button className='cancel-btn' onClick={handleCancel} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddJob