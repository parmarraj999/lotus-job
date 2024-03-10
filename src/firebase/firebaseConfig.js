import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCmFEd7N5WJsBnu36gJvRDNt9eYGE95sWs",
  authDomain: "lotusjobs-902dd.firebaseapp.com",
  projectId: "lotusjobs-902dd",
  storageBucket: "lotusjobs-902dd.appspot.com",
  messagingSenderId: "957544285154",
  appId: "1:957544285154:web:a64d29477c2063377cefbb"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export {app, auth,storage,db};

