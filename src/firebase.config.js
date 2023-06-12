import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxMuOjJubaPLPSONsYpuVVcDVtkGkruIU",
  authDomain: "app-veiculos-16c3e.firebaseapp.com",
  projectId: "app-veiculos-16c3e",
  storageBucket: "app-veiculos-16c3e.appspot.com",
  messagingSenderId: "487218248391",
  appId: "1:487218248391:web:d449540e35653bf5f41ce2"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);