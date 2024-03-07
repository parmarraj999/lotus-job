import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import "./photo.css";
import { Outlet } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Upload from '../../function/upload/upload';
import { db } from "../../firebase/firebaseConfig";
import { storage } from '../../firebase/firebaseConfig';

function Photo() {

  const [file, setFile] = useState();
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([])

  const getImgData = async () => {
    const storeRef = collection(db, `photos`)
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
  }
  useEffect(() => {
    getImgData()
    // console.log(data)
  })


  return (
    <div className='photo_container' >
      {
        showForm ?
          <Upload setShowForm={setShowForm} /> : ""
      }
      <div className='header-photos' >
        <h1>Gallary</h1>
        <button className='add-button' onClick={() => setShowForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className='image_container' >
        {
          data.map((data) => {
            return (
              <div className="image-card">
                <div className="image-card-container" >
                  <img src={`${data.photoUrl}`} />
                </div>
                <div style={{width:"90%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h1>{data.title}</h1>
                  <div className="delete-icon">
                  <FontAwesomeIcon className='utility-btn' icon={faTrash} onClick={async () => {
                    let imgRef = ref(storage, `photos`)
                    await deleteDoc(doc(db, `photos/${data.id}`))
                    deleteObject(imgRef).then(async () => {
                      console.log("delete successfully")
                    })
                  }} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Photo