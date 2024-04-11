import React, { useState, useEffect } from 'react'
import { db, storage } from "../../firebase/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { ref } from 'firebase/storage';
import { deleteObject } from 'firebase/storage';
import "../recent-css/recent-all.css"


function RecentPhoto() {

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [showPop, setShowPop] = useState(false)
  const [deleteId, setDeleteId] = useState();
  const [dataFile, setDataFile] = useState();

  const getImgData = async () => {
    const storeRef = collection(db, `photos`)
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    console.log(data)
  }
  useEffect(() => {
    getImgData()
    console.log(data)
  }, [count])

  const handleDelete = (dataId,fileName) => {
    setShowPop(true);
    setDeleteId(dataId)
    setDataFile(fileName)
    console.log(deleteId)
  }

  return (
    <div className='recent-photo-container' >
      {
        showPop ?
          <div className='sure-container' >
            <div className='sure-card' >
              <h1>Are you Sure ?</h1>
              <div className='btn-container-sure' >
                <div className='delete-btn-sure' onClick={async () => {
                  let imgRef = ref(storage, `photos/${dataFile}`)
                  await deleteDoc(doc(db, `photos/${deleteId}`))
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                    setShowPop(false)
                  })
                  setCount((c) => c + 1)
                }}> Delete </div>
                <button className='cancel-btn-sure' onClick={() => setShowPop(false)}>Cancel</button>
              </div>
            </div>
          </div>
          : ""
      }
      <div className='photo-container' >
        {
          data.map((data) => {
            return (
              <div className='photo-card' >
                <img src={data.imgUrl} />
                <h1 className='img-title'>{data.title}</h1>
                <div className='img-delete-btn' onClick={async () => handleDelete(data.id,data.name)}>
                  <h1>Delete</h1>
                  <FontAwesomeIcon className='utility-btn' icon={faTrash} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentPhoto