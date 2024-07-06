import React, { useEffect, useState } from 'react'
import "../recent-css/recent-all.css"
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import Sidebar from '../recent-css/sidebar/sidebar'

function RecentApply() {

  const [data, setData] = useState([])
  const [count, setCount] = useState(0);

  const [showPop, setShowPop] = useState(false)
  const [deleteId, setDeleteId] = useState();

  const getImgData = async () => {
    const storeRef = collection(db, "Apply-Data")
    const q = query(storeRef, orderBy('queryDate', "desc"))
    const dataRef = await getDocs(q)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    // console.log(data)
  }

  console.log(new Date())

  useEffect(() => {
    getImgData();
    // console.log(data)

  }, [count])

  const handleDelete = (dataId) => {
    setShowPop(true);
    setDeleteId(dataId)
    console.log(deleteId)
  }

  const [layout, setLayout] = useState(false)
  const [showSide,setShowSide] = useState(false)
  const [showData,setShowData] = useState()

  const handleDetail = (data) => {
    setShowSide(true)
    setShowData(data)
  }

  return (
    <div className={showPop ? 'recent-apply-container oh' : 'recent-apply-container os'} >
      {
        showPop ?
          <div className='sure-container' >
            <div className='sure-card' >
              <img src='../../../../images/delete-img.png' />
              <p>Are you sure you want to Delete ?</p>
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
      {
        showSide ? <Sidebar setCount={setCount} data={showData} setShowSide={setShowSide} /> : ""
      }
       <div className='layout-btn' onClick={()=>setLayout(!layout)} >
        {
          layout ? 
          <svg style={{color:"white",width:"40px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11V5H5V11H19ZM19 13H5V19H19V13ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"></path></svg>
          :
          <svg style={{color:"white",width:"40px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>
        }
        </div>
      <div className='apply-container' >
        {
          data.map((data) => {
            return (
              <>
                {
                  layout ?
                    <div className='apply-card2' >
                      <div className='apply-img-container2' >
                        {
                          data.img_url ?
                            <img src={`${data.img_url}`} />
                            : <h2>You Delete this Job</h2>
                        }
                      </div>
                      <div className='card-detail2' >
                        <h2>{data.name}</h2>
                        <h4>{data.email}</h4>
                        <h3>{data.number}</h3>
                      </div>
                      <div className='apply-card-btn2' >
                        <div className='delete-btn2' onClick={() => handleDelete(data.id)}> Delete </div>
                        <div className='view-btn2' onClick={()=>handleDetail(data)} > Details</div>
                      </div>
                    </div>
                    :

                    <div className='apply-card' >
                      <div className='apply-card-img'>
                        {
                          data.img_url ?
                            <img src={`${data.img_url}`} />
                            : <h2>You Delete this Job</h2>
                        }
                      </div>
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
                }
              </>


            )
          })
        }
      </div>
    </div >
  )
}

export default RecentApply