// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfJCx5m04mABfSGIJq0AiaXE8741yQcTQ",
  authDomain: "social-media-f4171.firebaseapp.com",
  projectId: "social-media-f4171",
  storageBucket: "social-media-f4171.appspot.com",
  messagingSenderId: "345830414266",
  appId: "1:345830414266:web:8fa72f29e18aff0f61ef83",
  measurementId: "G-N56QGZJS3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = new getFirestore(app);