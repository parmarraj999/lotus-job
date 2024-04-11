import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { Suspense, useEffect, useState } from 'react'
import "./photo.css";
import Upload from '../../function/upload/upload';
import { db, storage } from "../../firebase/firebaseConfig";
import { listAll, ref } from 'firebase/storage';
import VideoContainer from './videoContainer';

function Photo() {

  const [file, setFile] = useState();
  const [showForm, setShowForm] = useState(false);

  const [currSection,setCurrSection] = useState(true)

  const [data, setData] = useState([])

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
  },[])

  return (
    <div className='photo_container' >
      <div className='image-header' >
        <div className='filter-tags' onClick={()=>setCurrSection(true)}>Images</div>
        <div className='filter-tags' onClick={()=>setCurrSection(false)}>Videos</div>
      </div>
      {
        currSection ?
      <div className='image_container' > 
        {
          data.map((data) => {
            return (
              <div className="image-card">
                <div className="image-card-container" >
                  <Suspense fallback={<h1>loading</h1>} >
                  <img src={`${data.imgUrl}`} />
                  </Suspense>
                </div>
                <div>
                  <h2>{data.title}</h2>
                </div>
              </div>
            )
          })
        }
      </div> : 
      <VideoContainer/>
      }
    </div>
  )
}

export default Photo;