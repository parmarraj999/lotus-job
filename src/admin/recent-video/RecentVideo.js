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


  return (
    <div className='recent-video-container'>
      {
        data.map((data,key)=>{
          return(
            <div className='video-card' >
              <video controls>
                <source src={`${data.imgUrl}`}/>
              </video>
              <div className='video-delete-btn' onClick={async () => {
                  let imgRef = ref(storage, `videos/${data.name}`)
                  await deleteDoc(doc(db, `videos/${data.id}`))
                  deleteObject(imgRef).then(async () => {
                    console.log("delete successfully")
                  })
                  setCount((c)=> c + 1)
                }}>
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