import React, { useState, useEffect } from 'react'
import './job.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faBars, faHeart } from '@fortawesome/fontawesome-free-solid'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { faShare } from "@fortawesome/fontawesome-free-solid";

function Job() {
  const [role, setRole] = useState("backOffice");
  const [menuOpen, SetMenuOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const allData = [
    "Front-Office-Work",
    "Back-Office-Work",
    "Banking Sector",
    "Medical",
    "Marketing"
  ]

  function handleRole(role) {
    setRole(role)
    SetMenuOpen(false)
  }

  const filteredItems = (val) => {
    const newItem = data.filter((newVal) => newVal.field === `${val}`)
    console.log(newItem)
    setData(newItem)
  }


  const getImgData = async () => {
    const storeRef = collection(db, "All-Jobs-Data")
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    console.log("data successfully get")
  }
  useEffect(() => {
    getImgData()
  }, [])
  // console.log(data)

  const getQuery = async (val) => {
    const q = query(collection(db, "All-Jobs-Data"), where("field", "==", val));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   setData([{ ...doc.data(),id:data.id }])
    // });
    const dataRef = await getDocs(q)
    const allData = dataRef.docs.map(data=>
      ({...data.data(),id:data.id})
      )
    setData(allData)
    console.log(allData)
  }

  return (
    <div className='job-container' >
      <div className='nav' >
        <Link to='/' className='back-btn' >
          <FontAwesomeIcon icon={faArrowLeft} />Back
        </Link>
        <hr style={{ marginTop: "1rem" }} ></hr>
        <div className='menu-container' >
          <ul>
            <li className='menu-item' onClick={getImgData} >All Jobs  <FontAwesomeIcon icon={faArrowRight} /> </li>
            <li className='menu-item' onClick={() => getQuery("Front-Office-Work")} >Front Office Work <FontAwesomeIcon icon={faArrowRight} /> </li>
            <li className='menu-item' onClick={() => getQuery("Back-Office-Work")} >Back Office Work <FontAwesomeIcon icon={faArrowRight} /></li>
            <li className='menu-item' onClick={() => getQuery("Banking Sector")} >Banking Sector <FontAwesomeIcon icon={faArrowRight} /></li>
            <li className='menu-item' onClick={() => getQuery("Medical")} >Medical <FontAwesomeIcon icon={faArrowRight} /></li>
            <li className='menu-item' onClick={() => getQuery("Marketing Fields")} >Marketing Field <FontAwesomeIcon icon={faArrowRight} /></li>
          </ul>
        </div>
      </div>
      <div className='main-container' >
        <div className='header-main-container' >
          <h1>Job Roles</h1>
        </div>
        <div className='role-container' >

          {
            data.map((data) => {
              return (
                <div className="job-card" >
                  <div className="job-card-image-container" >
                    <img src={data.imgUrl} />
                  </div>
                  <div className="job-card-details">
                    <h1>{data.title}</h1>
                    <h2>{data.description}</h2>
                  </div>
                  <div className="action-btn">
                    <div className="like-btn job-btn" >
                      {/* <FontAwesomeIcon icon={active ? "fa-solid fa-heart" : "fa-regular fa-heart"} /> */}
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <button className="apply-btn" >Apply</button>
                    <div className="like-btn job-btn " >
                      <FontAwesomeIcon icon={faShare} />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='mobile-job-nav'>
        <Link to='/' className='back-btn' style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div>
          {
            menuOpen ?
              <div className='back-btn' onClick={() => SetMenuOpen(false)} style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center", background: "black", color: "white" }} >
                <FontAwesomeIcon icon={faClose} />
              </div>
              :
              <div className='back-btn' onClick={() => SetMenuOpen(true)} style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center", background: "black", color: "white" }} >
                <FontAwesomeIcon icon={faBars} />
              </div>
          }
          {
            menuOpen ?
              <div className='mobile-job-nav-menu'>
                <div className='menu-container' >
                  <ul>
                    <li className='menu-item' onClick={getImgData} >All Jobs  <FontAwesomeIcon icon={faArrowRight} /> </li>
                    <li className='menu-item' onClick={() => getQuery("Front-Office-Work")} >Front Office Work <FontAwesomeIcon icon={faArrowRight} /> </li>
                    <li className='menu-item' onClick={() => getQuery("Back-Office-Work")} >Back Office Work <FontAwesomeIcon icon={faArrowRight} /></li>
                    <li className='menu-item' onClick={() => getQuery("Banking Sector")} >Banking Sector <FontAwesomeIcon icon={faArrowRight} /></li>
                    <li className='menu-item' onClick={() => getQuery("Medical")} >Medical <FontAwesomeIcon icon={faArrowRight} /></li>
                    <li className='menu-item' onClick={() => getQuery("Marketing Fields")} >Marketing Field <FontAwesomeIcon icon={faArrowRight} /></li>
                  </ul>
                </div>
              </div>
              : ""
          }
        </div>
      </div>
    </div>
  )
}

export default Job;