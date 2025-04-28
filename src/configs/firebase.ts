import {  initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfhq92dQQXjznr37JiIZ43dEzuCrF2RjE",
  authDomain: "apica-app.firebaseapp.com",
  projectId: "apica-app",
  storageBucket: "apica-app.appspot.com",
  messagingSenderId: "19475246842",
  appId: "1:19475246842:web:0bc3321de1c7b29222e343",
  measurementId: "G-HHYRRQH5CK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to local storage");
  })
  .catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
