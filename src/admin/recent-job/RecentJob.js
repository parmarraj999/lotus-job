import React, { useState, useEffect } from 'react'
import "../dashboard"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db, storage } from '../../firebase/firebaseConfig'
import { deleteObject, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function RecentJob() {

  const [data, setData] = useState([]);

  const getImgData = async () => {
    const storeRef = collection(db, "All-Jobs-Data")
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
    <div className='recent-job-container' >
      {
        data.map((data,key) => {
          return (
            <div className='job-card-dashboard' key={key} >
              <div className='dashboard-job-card-image-container' >
                <img src={`${data.imgUrl}`} />
              </div>
              <div className='dashboard-job-card-detail' >
                <h4>{data.title}</h4>
                <h6>field: <span>{data.field}</span></h6>
                <p>{data.description}</p>
                <button className='delete-btn-jobs'onClick={async()=>{
                  let imgRef = ref(storage, `job-role`)
                  await deleteDoc(doc(db, `All-Jobs-Data/${data.id}`))
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                  })
                  await deleteDoc(doc(db, `${data.field}/`)).then((res)=>{
                    console.log(res,"delete successfully")
                  })
                }} >Delete</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecentJob