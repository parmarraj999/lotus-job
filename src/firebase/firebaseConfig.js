import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAtPjagagY6WK0UiocGfwSTWRffBuZ8o30",
  authDomain: "jobconsultancy-2cdc1.firebaseapp.com",
  projectId: "jobconsultancy-2cdc1",
  storageBucket: "jobconsultancy-2cdc1.appspot.com",
  messagingSenderId: "1026848075954",
  appId: "1:1026848075954:web:f1f975ca4df123179299ab"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export {app, auth,storage,db};

