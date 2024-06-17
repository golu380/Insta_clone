import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB0nNHQ17_wSLuF4x23b4aoi7Drw6lYHd0",
    authDomain: "instagram-6464f.firebaseapp.com",
    projectId: "instagram-6464f",
    storageBucket: "instagram-6464f.appspot.com",
    messagingSenderId: "961615963533",
    appId: "1:961615963533:web:bc2cb6f3889112394f49c4",
    measurementId: "G-M26942EL4P"
  };
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  const storage = getStorage(firebase);
  
  export { auth, firebase, db, storage };