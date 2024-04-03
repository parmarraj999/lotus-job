import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import "./photo.css";
import Upload from '../../function/upload/upload';
import { db, storage } from "../../firebase/firebaseConfig";
import { listAll, ref } from 'firebase/storage';

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
    console.log(data)
  }
  useEffect(() => {
    getImgData()
  },[])

  useEffect(()=>{
    const listRef = ref(storage, 'photos/');
    listAll(listRef).then((res)=>{
      res.items.forEach((itemRef) => {
        console.log(itemRef)
      });
    })
  })

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
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Photo;