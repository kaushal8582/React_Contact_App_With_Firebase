// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiakQerwqq3Hg_-TaUT54Lb-S8rgtGxUc",
  authDomain: "contact-app-fb127.firebaseapp.com",
  projectId: "contact-app-fb127",
  storageBucket: "contact-app-fb127.appspot.com",
  messagingSenderId: "588033745812",
  appId: "1:588033745812:web:ab131888dbcb9c596ee581"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);