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
  const [count,setCount] = useState(0);

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

  useEffect(()=>{
    
  })

  return (
    <div className='recent-photo-container' >
      <div className='photo-container' >
        {
          data.map((data) => {
            return (
              <div className='photo-card' >
                <img src={data.imgUrl} />
                <h1 className='img-title'>{data.name}</h1>
                <div className='img-delete-btn' onClick={async () => {
                  let imgRef = ref(storage, `photos/${data.name}`)
                  await deleteDoc(doc(db, `photos/${data.id}`))
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                  })
                  setCount((c)=> c + 1)
                }}>
                  <h1>Delete</h1>
                <FontAwesomeIcon className='utility-btn' icon={faTrash}  />
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