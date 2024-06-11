import React,{useState,useEffect} from 'react'
import "../recent-css/recent-all.css"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { deleteObject, ref } from 'firebase/storage';

function RecentVideo() {

  const [data, setData] = useState([]);
  const [count,setCount] = useState(0);

  const [showPop, setShowPop] = useState(false)
  const [deleteId, setDeleteId] = useState();
  const [dataFile, setDataFile] = useState();

  const getImgData = async () => {
    const storeRef = collection(db, `videos`)
    const dataRef = await getDocs(storeRef)
    const allData = dataRef.docs.map(data =>
      ({ ...data.data(), id: data.id }))
    setData(allData)
    console.log(data)
  }
  useEffect(() => {
    getImgData()
    console.log(data)
  }, [count])

  const handleDelete = (dataId,fileName) => {
    setShowPop(true);
    setDeleteId(dataId)
    setDataFile(fileName)
    console.log(deleteId)
  }


  return (
    <div className='recent-video-container'>
       {
        showPop ?
          <div className='sure-container' >
            <div className='sure-card' >
            <img src='../../../../images/delete-img.png' />
              <p>Are you sure you want to Delete ?</p>
              <div className='btn-container-sure' >
                <div className='delete-btn-sure' onClick={async () => {
                  let imgRef = ref(storage, `videos/${dataFile}`)
                  await deleteDoc(doc(db, `videos/${deleteId}`))
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                    setShowPop(false)
                  })
                  setCount((c)=> c + 1)
                }}> Delete </div>
                <button className='cancel-btn-sure' onClick={() => setShowPop(false)}>Cancel</button>
              </div>
            </div>
          </div>
          : ""
      }
      {
        data.map((data,key)=>{
          return(
            <div className='video-card' >
              <video controls>
                <source src={`${data.imgUrl}`}/>
              </video>
              <div className='video-delete-btn' onClick={async () => handleDelete(data.id,data.name)}>
                  <h1>Delete</h1>
                <FontAwesomeIcon className='utility-btn' icon={faTrash}  />
                  </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecentVideo