import React, { useEffect, useState } from 'react'
import "../recent-css/recent-all.css"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'

function RecentApply() {

  const [data, setData] = useState([])
  const [count,setCount] = useState(0);

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

  return (
    <div className='recent-apply-container' >
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
                <div className='delete-btn' onClick={async()=>{
                   await deleteDoc(doc(db, `Apply-Data/${data.id}`))
                   .then(()=>{
                    console.log('delete successfull')
                   })
                   setCount((c)=> c + 1)
                }}> Delete </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentApply