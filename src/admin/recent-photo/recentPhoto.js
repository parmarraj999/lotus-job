import React, { useState, useEffect } from 'react'
import { db, storage } from "../../firebase/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import "../dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { ref } from 'firebase/storage';
import { deleteObject } from 'firebase/storage';

function RecentPhoto() {

  const [data, setData] = useState([]);

  const getImgData = async () => {
    const storeRef = collection(db, `photo`)
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    console.log(data)
  }
  useEffect(() => {
    getImgData()
    // console.log(data)
  }, [])

  return (
    <div className='recent-photo-container' >
      <div className='photo-container' >
        {
          data.map((data) => {
            return (
              <div className='photo-card' >
                <img src={data.imgUrl} />
                <h1>{data.name}</h1>
                <FontAwesomeIcon className='utility-btn' icon={faTrash} onClick={async () => {
                  let imgRef = ref(storage, `photos/${data.fileName}`)
                  await deleteDoc(doc(db, `photo/${data.id}`))
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                  })
                }} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentPhoto