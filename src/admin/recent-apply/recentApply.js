import React, { useEffect, useState } from 'react'
import "../recent-css/recent-all.css"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'

function RecentApply() {

  const [data, setData] = useState([])
  const [count, setCount] = useState(0);

  const [showPop, setShowPop] = useState(false)
  const [deleteId, setDeleteId] = useState();

  const getImgData = async () => {
    const storeRef = collection(db, "Apply-Data")
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    // console.log(data)
  }

  useEffect(() => {
    getImgData();
    // console.log(data)
  }, [count])

  const handleDelete = (dataId) => {
    setShowPop(true);
    setDeleteId(dataId)
    console.log(deleteId)
  }

  return (
    <div className={showPop ? 'recent-apply-container oh' : 'recent-apply-container os'} >
      {
        showPop ?
          <div className='sure-container' >
            <div className='sure-card' >
              <h1>Are you Sure ?</h1>
              <div className='btn-container-sure' >
                <div className='delete-btn-sure' onClick={async () => {
                  await deleteDoc(doc(db, `Apply-Data/${deleteId}`))
                    .then(() => {
                      console.log('delete successfull')
                      setTimeout(() => {
                        setShowPop(false)
                      }, 3000);
                    })
                  setCount((c) => c + 1)
                }}> Delete </div>
                <button className='cancel-btn-sure' onClick={() => setShowPop(false)}>Cancel</button>
              </div>
            </div>
          </div>
          : ""
      }
      <div className='apply-header' >Applied</div>
      <div className='apply-container' >
        {
          data.map((data) => {
            return (
              <div className='apply-card' >
                <h1>{data.name}</h1>
                <h2>{data.email} </h2>
                <div style={{ display: 'flex', justifyContent: "space-between" }} >
                  <h3>{data.number}</h3>
                  <h3>{data.alternateNumber}</h3>
                </div>
                <h4>{data.address}</h4>
                <div style={{ display: 'flex', gap: "1rem" }} >
                  <div className='apply-title' >{data.jobTitle}</div>
                  <div className='apply-field' >{data.jobField}</div>
                </div>
                <div style={{ display: 'flex', gap: "1rem" }} >
                  <h5 className='dateTime'>Time : <span>{data.time}</span> / Date : <span>{data.date}</span></h5>
                </div>
                <div className='delete-btn' onClick={() => handleDelete(data.id)}> Delete </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentApply