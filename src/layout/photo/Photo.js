import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import "./photo.css";
import Upload from '../../function/upload/upload';
import { db } from "../../firebase/firebaseConfig";

function Photo() {

  const [file, setFile] = useState();
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([])

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
  },[])

  return (
    <div className='photo_container' >
      {
        showForm ?
          <Upload setShowForm={setShowForm} /> : ""
      }
       <div className='image-header' >
          <div className='filter-tags' >Gallary</div>
          <div className='filter-tags' >Success</div>
          <div className='filter-tags' >Event</div>
        </div> 
      <div className='image_container' > 
        {
          data.map((data) => {
            return (
              <div className="image-card">
                <div className="image-card-container" >
                  <img src={`${data.imgUrl}`} />
                </div>
                <div className='image-title'>
                  <h1 style={{fontSize:"22px"}} >{data.name}</h1>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Photo;