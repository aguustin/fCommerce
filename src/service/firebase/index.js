// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXSlhTuZbW2KfwjCohaoh0j0D7-6w690w",
  authDomain: "fcommerce-6a132.firebaseapp.com",
  projectId: "fcommerce-6a132",
  storageBucket: "fcommerce-6a132.appspot.com",
  messagingSenderId: "357085241451",
  appId: "1:357085241451:web:0952f101a67cb3e0d7512e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(app);