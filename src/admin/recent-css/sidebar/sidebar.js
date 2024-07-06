import React, { useState } from 'react'
import "./sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'

function Sidebar({ setCount, setShowSide, data }) {

  console.log(data)

  const [showPop, setShowPop] = useState(false)
  const [deleteId, setDeleteId] = useState();


  const handleDelete = (dataId) => {
    setShowPop(true);
    setDeleteId(dataId)
    console.log(deleteId)
  }

  return (
    <div className='side-bar-container' >
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
      <div className='side-bar' >
        <div className='side-bar-header' >
          <h2>Details</h2>
          <div className='close-icon' onClick={() => setShowSide(false)} >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className='side-bar-img' >
          <img src={`${data?.img_url}`} />
        </div>
        <div className='side-bar-details' >
          <div className='side-detail-box'>
            <h4>Name</h4>
            <h2>{data?.name}</h2>
          </div>
          <div className='side-detail-box'>
            <h4>Contact</h4>
            <h2>{data?.number}, {data?.alternateNumber}</h2>
          </div>
          <div className='side-detail-box'>
            <h4>address</h4>
            <h2>{data?.address}</h2>
          </div>
          <div className='side-detail-box'>
            <h4>Apply For </h4>
            <h2 style={{ color: "blue" }}>{data?.jobTitle} In {data?.jobField}</h2>
          </div>
        </div>
        <div className='side-card-btn' >
          <div className='delete-btn2' onClick={() => handleDelete(data.id)}> Delete </div>
          <div className='view-btn2' onClick={() => setShowSide(false)} > Cancel</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar