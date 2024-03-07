import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import React, { useState } from 'react';
import "./upload.css"
import { db, storage } from "../../firebase/firebaseConfig";

const Upload = (props) => {

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState()
  const [url, setUrl] = useState();

  function handleFile(event) {
    setFile(event.target.files[0])
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleUpload = async (e) => {
    // e.preventDefault();
    const storageRef = ref(storage, `/photos/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed",
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          console.log("url", url)
          setUrl(url)
          if (url !== null) {
            const collectionRef = collection(db, `photo`)
            await addDoc(collectionRef, { imgUrl: url, name: title })
            console.log("added to database")
            setTimeout(() => {
              console.log('successfull')
            }, 3000);
          }
        })
      },
      setTimeout(() => {
        props.setShowForm(false)
      }, 3000)
        )
  }

return (

  <div className='upload_form_container' >
    <div className='upload_form' >
      <h2>Upload Image</h2>
      <input type='file' className='file_input' onChange={handleFile}
      />
      <input type='text' placeholder='enter title' className='title_input' onChange={handleTitle} />
      <div style={{ display: "flex", gap: ".8rem" }} >
        <button
          onClick={handleUpload}
        >Upload</button>
        <button style={{ background: "grey" }}
          onClick={() => props.setShowForm(false)}
        >cancel</button>
      </div>
    </div>
  </div>
);
};

export default Upload;
