import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import "./photo.css";
import { db } from "../../firebase/firebaseConfig";

const VideoContainer = ()=> {

  const [data, setData] = useState([])

  const getVidData = async () => {
    const storeRef = collection(db, `videos`)
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    console.log(data)
  }
  useEffect(() => {
    getVidData()
    console.log(data)
  },[])

  return (
    <div className='video-container' >
      {
        data.map((data,key)=>{
          return(
            <div className='video-card'>
                <video controls>
                  <source src={`${data.imgUrl}`} ></source>
                </video>
                <div className='video-title' >
                  <p>{data.title}</p>
                  </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default VideoContainer