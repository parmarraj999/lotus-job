import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react';
import "./upload.css"
import { db, storage } from "../../firebase/firebaseConfig";

const Upload = (props) => {

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState()

  function handleFile(event) {
    setFile(event.target.files[0])
  }


  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const hanldeUpload = async() => {
    const storage = getStorage();
    const storageRef = ref(storage, 'photos');
    const docRef = doc(collection(db,"photos"))
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(storageRef).then(async(url)=>{
        console.log(url)
        await setDoc(docRef, {
          photoUrl : url,
          title: title
        })
        console.log('data successfull upload')
      })
      setTimeout(() => {
        props.setShowForm(false)
      }, 3000);
    });
    
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
            onClick={hanldeUpload}
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
