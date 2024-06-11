import React, { useState, useEffect } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db, storage } from '../../firebase/firebaseConfig'
import { deleteObject, ref } from 'firebase/storage';
import "../recent-css/recent-all.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';


function RecentJob() {

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [showPop, setShowPop] = useState(false)
  const [deleteId, setDeleteId] = useState();
  const [dataFile, setDataFile] = useState();

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
  }, [count])
  console.log(count)

  const handleDelete = (dataId, fileName) => {
    setShowPop(true);
    setDeleteId(dataId)
    setDataFile(fileName)
    console.log(deleteId)
    console.log(fileName)
  }

  return (
    <div className='recent-job-container' >
      {
        showPop ?
          <div className='sure-container' >
            <div className='sure-card' >
            <img src='../../../../images/delete-img.png' />
              <p>Are you sure you want to Delete ?</p>
              <div className='btn-container-sure' >
                <div className='delete-btn-sure' onClick={async () => {
                  setShowPop(false);
                  let imgRef = ref(storage, `job-role/${dataFile}`)
                  await deleteDoc(doc(db, `All-Jobs-Data/${deleteId}`))
                  setCount((c) => c + 1)
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                  })
                }}> Delete </div>
                <button className='cancel-btn-sure' onClick={() => setShowPop(false)}>Cancel</button>
              </div>
            </div>
          </div>
          : ""
      }
      {
        data.map((data, key) => {
          return (
            <div className='job-card-dashboard' key={key} >
              <div className='dashboard-job-card-image-container' >
                <img src={`${data.imgUrl}`} />
              </div>
              <div className='dashboard-job-card-detail' >
                <h4>{data.title}</h4>
                <h6>Field: <span>{data.field}</span></h6>
                <p>{data.description}</p>
                <button className='delete-btn-jobs' onClick={async () => handleDelete(data.id, data.fileName)} >Delete</button>
              </div>
            </div>
          )
        })
      }
      <div className='refresh-btn' onClick={()=>getImgData()} >
        <FontAwesomeIcon icon={faRotateRight}/>
      </div>
    </div>
  )
}

export default RecentJob