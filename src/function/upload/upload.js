import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import React, { useState } from 'react';
import "./upload.css"
import { db, storage } from "../../firebase/firebaseConfig";

const Upload = (props) => {

  const [file, setFile] = useState(null)
  const [url, setUrl] = useState();
  const [percent, setPercent] = useState(0)

  const [message, setMessage] = useState("")
  const [clicked, setClicked] = useState(false)
  // const [fileName,setFileName] = useState();

  function handleFile(event) {
    setFile(event.target.files[0])
  }



  const handleUpload = (e) => {
    e.preventDefault();
    setClicked(true)
    const storageRef = ref(storage, `/photos/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed",
      async (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
        console.log(percent)
      },
      (err) => console.log("error in upload ", err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          console.log("url", url)
          setUrl(url)
          if (url !== null) {
            const collectionRef = collection(db, `photos/`)
            await addDoc(collectionRef, { imgUrl: url, name: file.name })
            console.log("added to database")
            setMessage("done")
            setTimeout(() => {
              props.setShowForm(false)
            }, 3000);
          }
        })
      }
    )
  }

  console.log(percent)


  return (

    <div className='upload_form_container' >
      <div className='upload_form' >
        <h2>Upload Image</h2>
        <input type='file' className='file_input' onChange={handleFile} />
        <h2>{file?.name}</h2>
        <div className="upload-bar">
          <div className="bar" style={{width:`${percent}%`}} ></div>
        </div>
        {
          clicked ?
            <button style={{ background: "grey" }} onClick={() => props.setShowForm(false)}>cancel</button>
            :
            <div style={{ display: "flex", gap: ".8rem" }} >
              <button onClick={handleUpload}>Upload</button>
              <button style={{ background: "grey" }} onClick={() => props.setShowForm(false)}>cancel</button>
            </div>
        }
      </div>
    </div>
  );
};

export default Upload;
