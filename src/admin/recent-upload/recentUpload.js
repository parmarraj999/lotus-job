import React, { useEffect, useState } from 'react'
import "../recent-css/recent-all.css"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/fontawesome-free-regular'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'


function RecentUpload() {

  const [data, setData] = useState([])
  const [count, setCount] = useState(0);

  const getImgData = async () => {
    const storeRef = collection(db, "company-job-Data")
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    // console.log(data)
  }
  useEffect(() => {
    getImgData();
    console.log(data)
  }, [count])

  return (
    <div className='company-job-container' >
      {
        data.map((data) => {
          return (
            <div className='upload-detail-card' >
              <div className='detail-section-1' >
                <div>
                  <h1 className='detail-job-title' >{data.jobTitle}</h1>
                  <h2 className='request-tag'>{data.requestBy}</h2>
                </div>
                <div style={{alignItems:"flex-end"}}>
                  <h3 className='detail-date'> <FontAwesomeIcon className='icon' icon={faCalendarDay} />{data.date}</h3>
                  <h3 className='detail-time'><FontAwesomeIcon className='icon' icon={faClock} /> {data.time}</h3>
                </div>
              </div>
              <p className='detail-description'>{data.description}</p>
              <div>
                <h3 className='upload-name'>{data.name}</h3>
                <div className='upload-contact' >
                  <h4 className='upload-email' >{data.email}</h4>
                  <h4 className='upload-number' >{data.number}</h4>
                </div>
              </div>
              <button className='upload-delete' onClick={async()=>{
                   await deleteDoc(doc(db, `company-job-Data/${data.id}`))
                   .then(()=>{
                    console.log('delete successfull')
                   })
                   setCount((c)=> c + 1)
              }}  >Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecentUpload